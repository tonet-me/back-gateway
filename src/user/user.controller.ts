import { Body, Controller, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IReq } from 'src/common/interface/req.interface';
import { IResponse } from 'src/common/interface/responser.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserUpdateLimitDTO } from './dto/update.profile.dto';
import { IUser, IUserService } from './interface/user.interface';

@Controller('user')
export class UserController {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }
  @Put('/profile')
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
}
