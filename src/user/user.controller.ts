import { Body, Controller, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IReq } from 'src/common/interface/req.interface';
import { IResponse } from 'src/common/interface/responser.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserProfileUpdateDTO } from './dto/update.profile.dto';
import { IProfileUpdateResult, IUserService } from './interface/user.interface';

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
    @Body() updateProfileBody: UserProfileUpdateDTO,
  ): Observable<IResponse<IProfileUpdateResult>> {
    console.log('user', req.user);

    return from(
      this.userService.updateProfile({
        ...updateProfileBody,
        userId: req.user._id,
      }),
    );
  }
}
