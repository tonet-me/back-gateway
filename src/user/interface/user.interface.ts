import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { UserStatusEnum } from '../dto/update.profile.dto';

export interface IUserService {
  getProfile(data: Partial<IUser>): Observable<IResponse<IUser>>;
  updateProfile(data: Partial<IUser>): Observable<IResponse<IUser>>;
  completeProfile(data: Partial<IUser>): Observable<IResponse<IUser>>;
}

export interface IUser {
  readonly _id: string;
  readonly fullName: string;
  readonly email: string;
  readonly emailVerify: boolean;
  readonly verified: boolean;
  readonly photo: string;
  readonly isActive: boolean;
  readonly status: UserStatusEnum;
}
