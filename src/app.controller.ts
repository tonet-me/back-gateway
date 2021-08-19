import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, map, merge, mergeMap, Observable, of } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { Responser } from './common/utils/responser';
import { ISocialService } from './social/interface/social.interface';
import { UserNameDTO } from './user/dto/userName.dto';
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

  @Get('un/:userName')
  getUserPublic(
    @Param() { userName }: UserNameDTO,
  ): Observable<IResponse<any>> {
    const userReq = from(
      this.userService.getUserPublic({
        userName,
      }),
    );
    return userReq.pipe(
      mergeMap((userResult) => {
        if (userResult.success == false)
          throw new NotFoundException('username not found');
        return this.socialService
          .getSocialPublic({ userId: userResult.data._id })
          .pipe(
            map((socialsResult) => {
              return {
                userResult: userResult.data,
                socialsResult: socialsResult.success
                  ? socialsResult
                  : { ...socialsResult, data: [] },
              };
            }),
          );
      }),
      map(({ userResult, socialsResult }) => {
        return new Responser<any>(true, '', {
          userResult,
          socialsResult: socialsResult.data || [],
        });
      }),
    );
  }
}