import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ThrottlerOTPGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
  ): Promise<boolean> {
    const { req } = this.getRequestResponse(context);
    const phoneNumber = req?.body?.phoneNumber;
    if (!phoneNumber) throw new BadRequestException();

    const countRequest = await this.storageService.getRecord(
      `countOtpRequest:${phoneNumber}`,
    );
    if (countRequest.length > limit - 1) throw new ThrottlerException();
    return true;
  }
}
