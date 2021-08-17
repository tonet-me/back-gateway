import { SetMetadata } from '@nestjs/common';

export const UserStatus = (...status: string[]) =>
  SetMetadata('userStatus', status);
