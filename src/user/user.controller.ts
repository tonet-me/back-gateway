import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
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
import {
  UserCompleteProfile,
  UserStatusEnum,
  UserUpdateLimitDTO,
} from './dto/update.profile.dto';
import { IUser, IUserService } from './interface/user.interface';
import { UserIdDTO } from './dto/userId.dto';
import { UserStatusGuard } from 'src/auth/guard/userStatus.guard';
import { UserStatus } from 'src/auth/decorator/user.status';
import { VisibleInfoDTO } from './dto/visible.info.dto';

@Controller('user')
export class UserController {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  @Post('/complete')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.REGISTERED)
  @UseGuards(AuthGuard)
  completeProfile(
    @Req() req: IReq,
    @Body() userCompleteProfile: UserCompleteProfile,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.completeProfile({
        ...userCompleteProfile,
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

  @Put('/set-visible-info')
  @UseGuards(UserStatusGuard)
  @UserStatus(UserStatusEnum.COMPLETED)
  @UseGuards(AuthGuard)
  setVisibleInfo(
    @Req() req: IReq,
    @Body() visibleInfoData: VisibleInfoDTO,
  ): Observable<IResponse<IUser>> {
    return from(
      this.userService.setVisibleInfo({
        ...visibleInfoData,
        _id: req.user._id,
      }),
    );
  }
}
