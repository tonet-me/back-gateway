import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Responser } from './common/utils/responser';
import { ISocialService } from './social/interface/social.interface';
import { IUserService } from './user/interface/user.interface';

@Controller()
export class AppController {
  private userService: IUserService;
  private socialService: ISocialService;

  constructor(
    @Inject('USER_PACKAGE') private userClient: ClientGrpc,
    @Inject('SOCIAL_PACKAGE')
    private readonly socialClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<IUserService>('UserService');
    this.socialService =
      this.socialClient.getService<ISocialService>('SocialService');
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
    return new Responser(true, 'okkk', {
      text: 'loaderio-169937cb13dd33e0b33b75df8a4a2bbe',
    });
  }
}
