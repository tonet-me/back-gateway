import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Req,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { AddCardDto } from './dto/add.card.dto';
import { UpdateCardDto } from './dto/update.card.dto';
import { ICard, ICardService } from './interface/card.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IReq } from 'src/common/interface/req.interface';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { CardIdDTO } from './dto/card.id.dto';
import { UserStatus } from 'src/auth/decorator/user.status';
import { UserStatusEnum } from 'src/user/dto/update.profile.dto';
import { UserStatusGuard } from 'src/auth/guard/userStatus.guard';
import { QueryResolver } from 'src/common/utils/query.resolver';
import { CardQueryResolversDTO } from './dto/card.pagination.dto';

@Controller('card')
export class CardController {
  private cardService: ICardService;
  constructor(
    @Inject('CARD_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.cardService = this.client.getService<ICardService>('CardService');
  }

  @Get('/:cardId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  getOwnCard(
    @Req() req: IReq,
    @Param() { cardId }: CardIdDTO,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.getOwnCard({
        _id: cardId,
        userId: req.user._id,
      }),
    );
  }

  @Get('/')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  getOwnCards(
    @Req() req: IReq,
    @Query() query: CardQueryResolversDTO,
  ): Observable<IResponse<ICard[]>> {
    const queryResolver: QueryResolver = new QueryResolver(query);

    return from(
      this.cardService.getOwnCards({
        userId: req.user._id,
        ...queryResolver.query,
      }),
    );
  }

  @Post('/')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  addCard(
    @Req() req: IReq,
    @Body() addCardBody: AddCardDto,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.addCard({
        ...addCardBody,
        userId: req.user._id,
      }),
    );
  }

  @Put('/:cardId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  updateCard(
    @Req() req: IReq,
    @Param() { cardId }: CardIdDTO,
    @Body() updateCardBody: UpdateCardDto,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.updateCard({
        ...updateCardBody,
        _id: cardId,
        userId: req.user._id,
      }),
    );
  }

  @Delete('/:cardId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  DeleteCard(
    @Req() req: IReq,
    @Param() { cardId }: CardIdDTO,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.deleteOwnCard({
        _id: cardId,
        userId: req.user._id,
      }),
    );
  }

  @Delete('/:catdId/photo')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  deleteCardPhoto(
    @Req() req: IReq,
    { cardId }: CardIdDTO,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.updateCard({
        photo: '',
        _id: cardId,
        userId: req.user._id,
      }),
    );
  }
}
