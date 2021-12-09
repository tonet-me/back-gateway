import {
  Controller,
  Get,
  Headers,
  Inject,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, map, mergeMap, Observable } from 'rxjs';
import { AddCardDto } from './card/dto/add.card.dto';
import { CardIdDTO } from './card/dto/card.id.dto';
import { ICard, ICardService } from './card/interface/card.interface';
import { IResponse } from './common/interface/responser.interface';
import { Responser } from './common/utils/responser';
import { getUserAgent } from './common/utils/user.agent.parser.utils';
import { GoogleOauthGuard } from './oauth/google/gaurd/google.oauth.guard';
import { IViewCardService } from './view-card/interface/view-card.interface';
@Controller()
export class AppController {
  private cardService: ICardService;
  private viewCardService: IViewCardService;

  constructor(
    @Inject('CARD_PACKAGE')
    private readonly cardClient: ClientGrpc,
    @Inject('VIEW_CARD_PACKAGE')
    private readonly viewCardClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.cardService = this.cardClient.getService<ICardService>('CardService');
    this.viewCardService =
      this.viewCardClient.getService<IViewCardService>('ViewCardService');
  }

  @Get('un/:userName')
  public getPublicCardByUsername(
    @Headers('user-agent') userAgent: any,
    @Param() { userName }: Pick<AddCardDto, 'userName'>,
  ): Observable<IResponse<ICard>> {
    const userAgentParse = getUserAgent(userAgent);
    const getCardInfo = from(
      this.cardService.getPublicCardByUsername({
        userName,
      }),
    );
    return getCardInfo.pipe(
      mergeMap((cardInfoResult) => {
        if (!cardInfoResult.success)
          throw new NotFoundException('card not found ...');
        return from(
          this.viewCardService.addViewCard({
            cardId: cardInfoResult.data._id,
            ...userAgentParse,
          }),
        ).pipe(
          map((addViewResult) => {
            return {
              cardInfoResult,
              addViewResult,
            };
          }),
        );
      }),
      map(({ cardInfoResult, addViewResult }) => {
        return cardInfoResult;
      }),
    );
  }

  @Get('qr/:cardId')
  public getPublicCardByQrcode(
    @Headers('user-agent') userAgent: any,
    @Param() { cardId }: CardIdDTO,
  ): Observable<IResponse<ICard>> {
    const userAgentParse = getUserAgent(userAgent);
    const getCardInfo = from(
      this.cardService.getPublicCardByQrcode({
        _id: cardId,
      }),
    );
    return getCardInfo.pipe(
      mergeMap((cardInfoResult) => {
        if (!cardInfoResult.success)
          throw new NotFoundException('card not found ...');
        return from(
          this.viewCardService.addViewCard({
            cardId: cardInfoResult.data._id,
            ...userAgentParse,
          }),
        ).pipe(
          map((addViewResult) => {
            return {
              cardInfoResult,
              addViewResult,
            };
          }),
        );
      }),
      map(({ cardInfoResult, addViewResult }) => {
        return cardInfoResult;
      }),
    );
  }

  @Get('/loaderio-169937cb13dd33e0b33b75df8a4a2bbe.txt')
  test() {
    return new Responser(true, 'loaderio', {
      text: 'loaderio-169937cb13dd33e0b33b75df8a4a2bbe',
    });
  }
  @UseGuards(GoogleOauthGuard)
  @Get('/oauth')
  testoauth() {}
}
