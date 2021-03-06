import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IReq } from 'src/common/interface/req.interface';
import { IResponse } from 'src/common/interface/responser.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserStatusEnum, UserUpdateLimitDTO } from './dto/update.profile.dto';
import {
  IRequestCodeForForgetPassword,
  IUser,
  IUserService,
} from './interface/user.interface';
import { UserStatusGuard } from 'src/auth/guard/userStatus.guard';
import { UserStatus } from 'src/auth/decorator/user.status';
import { UserCompleteProfileWithEmailDTO } from './dto/complete.profile.email.dto';
import { UserCompleteProfileWithOauthDTO } from './dto/complete.profile.oauth.dto';
import { IsOauthRegisteredGuard } from 'src/auth/guard/check.oauth.registered.guard';
import { ChangePasswordDTO } from './dto/change.password.dto';
import { ForgetPasswordRequestCodeDTO } from './dto/forget.password.request.code.sto';
import { ForgetPasswordConformDTO } from './dto/forget.password.dto';
@Controller('user')
export class UserController {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  @Post('/complete-oauth')
  @UseGuards(IsOauthRegisteredGuard)
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.REGISTERED)
  @UseGuards(AuthGuard)
  completeProfileWithOauth(
    @Req() req: IReq,
    @Body() userCompleteProfile: UserCompleteProfileWithOauthDTO,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.completeProfileWithOauth({
        ...userCompleteProfile,
        _id: req.user._id,
      }),
    );
  }

  @Post('/complete-email')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.REGISTERED)
  @UseGuards(AuthGuard)
  completeProfileWithEmail(
    @Req() req: IReq,
    @Body() userCompleteProfile: UserCompleteProfileWithEmailDTO,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.completeProfileWithEmail({
        ...userCompleteProfile,
        _id: req.user._id,
      }),
    );
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: IReq): Observable<IResponse<IUser>> {
    return from(
      this.userService.getProfile({
        _id: req.user._id,
      }),
    );
  }

  @Put('/profile')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  updateProfile(
    @Req() req: IReq,
    @Body() updateProfileBody: UserUpdateLimitDTO,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.updateProfile({
        ...updateProfileBody,
        _id: req.user._id,
      }),
    );
  }

  @Put('/change-password')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  changePassword(
    @Req() req: IReq,
    @Body() changePassword: ChangePasswordDTO,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.changePassword({
        ...changePassword,
        _id: req.user._id,
      }),
    );
  }

  @Post('/forget-password/request-code')
  requestCodeForForgetPassword(
    @Body() { email }: ForgetPasswordRequestCodeDTO,
  ): Observable<IResponse<IRequestCodeForForgetPassword>> {
    return from(
      this.userService.requestCodeForForgetPassword({
        email,
      }),
    );
  }

  @Post('/forget-password/conform')
  conformForgetPassword(
    @Body() forgetPasswordConform: ForgetPasswordConformDTO,
  ): Observable<IResponse<Pick<IUser, 'email'>>> {
    return from(this.userService.forgetPasswordConform(forgetPasswordConform));
  }

  @Delete('/profile/photo')
  @UseGuards(AuthGuard)
  deleteProfilePhoto(@Req() req: IReq): Observable<IResponse<IUser>> {
    return from(
      this.userService.deleteProfilePhoto({
        _id: req.user._id,
      }),
    );
  }
}
