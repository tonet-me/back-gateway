import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, map, mergeMap, Observable } from 'rxjs';
import { UserStatus } from 'src/auth/decorator/user.status';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserStatusGuard } from 'src/auth/guard/userStatus.guard';
import { CardIdDTO } from 'src/card/dto/card.id.dto';
import { ICardService } from 'src/card/interface/card.interface';
import { IReq } from 'src/common/interface/req.interface';
import { IResponse } from 'src/common/interface/responser.interface';
import { QueryResolver } from 'src/common/utils/query.resolver';
import { UserStatusEnum } from 'src/user/dto/update.profile.dto';
import { AddViewCardDto } from './dto/add.view-card.dto';
import { ViewCardQueryResolversDTO } from './dto/view-card.pagination.dto';
import { IViewCard, IViewCardService } from './interface/view-card.interface';

@Controller('view-card')
export class ViewCardController {
  private viewCardService: IViewCardService;
  private cardService: ICardService;

  constructor(
    @Inject('VIEW_CARD_PACKAGE') private viewCardClient: ClientGrpc,
    @Inject('CARD_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.viewCardService =
      this.viewCardClient.getService<IViewCardService>('ViewCardService');
    this.cardService = this.client.getService<ICardService>('CardService');
  }

  //not use in production
  // @Post('/')
  // addViewCrad(
  //   @Body() addViewCardData: AddViewCardDto,
  // ): Observable<IResponse<IViewCard>> {
  //   console.log(addViewCardData);

  //   return from(this.viewCardService.addViewCard(addViewCardData));
  // }

  @Get('/:cardId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  getOwnViewsCard(
    @Req() req: IReq,
    @Param() { cardId }: CardIdDTO,
    @Query() query: ViewCardQueryResolversDTO,
  ): Observable<IResponse<IViewCard>> {
    const queryResolver: QueryResolver = new QueryResolver(query);
    queryResolver.query.filters.cardId = cardId;

    const getCardInfo = from(
      this.cardService.getOwnCard({ userId: req.user._id, _id: cardId }),
    );
    return getCardInfo.pipe(
      mergeMap((cardResult) => {
        if (!cardResult.success)
          throw new NotFoundException('card not found...');
        return from(
          this.viewCardService.getOwnViewsCard(queryResolver.query),
        ).pipe(
          map((viewCardResult) => {
            return {
              viewCardResult,
            };
          }),
        );
      }),
      map(({ viewCardResult }) => {
        return viewCardResult;
      }),
    );
  }
}
