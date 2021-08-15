import { Body, Controller, Inject, Put, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IReq } from 'src/common/interface/req.interface';
import { IResponse } from 'src/common/interface/responser.interface';
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
  makeOtp(
    @Req() req: IReq,
    @Body() updateProfileBody: UserProfileUpdateDTO,
  ): Observable<IResponse<IProfileUpdateResult>> {
    console.log('ppp');

    return from(
      this.userService.updateProfile({
        ...updateProfileBody,
        userId: '610e5916f9300756feab1e99',
      }),
    );
  }
}
