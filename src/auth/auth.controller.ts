import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './interface/auth.grpc.interface';

@Controller('auth')
export class AuthController {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get('/register')
  add(@Body() registerBody: RegisterDTO): Observable<any> {
    return this.userService.register(registerBody);
  }
}
