import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { AddCardDto } from './card/dto/add.card.dto';
import { ICard, ICardService } from './card/interface/card.interface';
import { IResponse } from './common/interface/responser.interface';
import { Responser } from './common/utils/responser';

@Controller()
export class AppController {
  private cardService: ICardService;

  constructor(
    @Inject('CARD_PACKAGE')
    private readonly cardClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.cardService = this.cardClient.getService<ICardService>('CardService');
  }

  @Get('un/:userName')
  public getPublicCard(
    @Param() { userName }: Pick<AddCardDto, 'userName'>,
  ): Observable<IResponse<ICard>> {
    return from(
      this.cardService.getPublicCard({
        userName,
      }),
    );
  }

  // @Get('un/:userName')
  // getUserPublic(
  //   @Param() { userName }: UserNameDTO,
  // ): Observable<IResponse<any>> {
  //   const userReq = from(
  //     this.userService.getUserPublic({
  //       userName,
  //     }),
  //   );
  //   return userReq.pipe(
  //     mergeMap((userResult) => {
  //       if (userResult.success == false)
  //         throw new NotFoundException('username not found');
  //       return this.socialService
  //         .getSocialPublic({ userId: userResult.data._id })
  //         .pipe(
  //           map((socialsResult) => {
  //             return {
  //               userResult: userResult.data,
  //               socialsResult: socialsResult,
  //             };
  //           }),
  //         );
  //     }),
  //     map(({ userResult, socialsResult }) => {
  //       return new Responser<any>(true, '', {
  //         userResult,
  //         socialsResult: socialsResult.data || [],
  //       });
  //     }),
  //   );
  // }

  @Get('/loaderio-169937cb13dd33e0b33b75df8a4a2bbe.txt')
  test() {
    return new Responser(true, 'loaderio', {
      text: 'loaderio-169937cb13dd33e0b33b75df8a4a2bbe',
    });
  }
}
