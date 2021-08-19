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
} from '@nestjs/common';
import { AddSocialDto } from './dto/addSocial.dto';
import { UpdateSocialDto } from './dto/updateSocial.dto';
import { ISocial, ISocialService } from './interface/social.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IReq } from 'src/common/interface/req.interface';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { SocialIdDTO } from './dto/socialId.dto';
import { UserStatus } from 'src/auth/decorator/user.status';
import { UserStatusEnum } from 'src/user/dto/update.profile.dto';
import { UserStatusGuard } from 'src/auth/guard/userStatus.guard';

@Controller('social')
export class SocialController {
  private socialService: ISocialService;
  constructor(
    @Inject('SOCIAL_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.socialService =
      this.client.getService<ISocialService>('SocialService');
  }

  @Get('/:socialId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  getOwnSocial(
    @Req() req: IReq,
    @Param() { socialId }: SocialIdDTO,
  ): Observable<IResponse<ISocial>> {
    return from(
      this.socialService.getOwnSocial({
        _id: socialId,
        userId: req.user._id,
      }),
    );
  }

  @Get('/')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  getOwnSocials(@Req() req: IReq): Observable<IResponse<ISocial>> {
    return from(
      this.socialService.getOwnSocials({
        userId: req.user._id,
      }),
    );
  }

  @Post('/')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  addSocial(
    @Req() req: IReq,
    @Body() addSocialBody: AddSocialDto,
  ): Observable<IResponse<ISocial>> {
    console.log('ok');

    return from(
      this.socialService.addSocial({
        ...addSocialBody,
        userId: req.user._id,
      }),
    );
  }

  @Put('/:socialId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  updateSocial(
    @Req() req: IReq,
    @Param() { socialId }: SocialIdDTO,
    @Body() updateSocialBody: UpdateSocialDto,
  ): Observable<IResponse<ISocial>> {
    return from(
      this.socialService.updateSocial({
        ...updateSocialBody,
        _id: socialId,
        userId: req.user._id,
      }),
    );
  }

  @Delete('/:socialId')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  DeleteSocial(
    @Req() req: IReq,
    @Param() { socialId }: SocialIdDTO,
  ): Observable<IResponse<ISocial>> {
    return from(
      this.socialService.deleteOwnSocial({
        _id: socialId,
        userId: req.user._id,
      }),
    );
  }

  @Get('/:socialId')
  getSocialPublic(
    @Param() { socialId }: SocialIdDTO,
  ): Observable<IResponse<ISocial>> {
    return from(
      this.socialService.getSocialPublic({
        _id: socialId,
      }),
    );
  }
}
