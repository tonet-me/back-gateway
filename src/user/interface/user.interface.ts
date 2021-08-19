import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { UserStatusEnum } from '../dto/update.profile.dto';

export interface IUserService {
  updateProfile(data: IUser): Observable<IResponse<IUser>>;
  setVisibleInfo(data: IUser): Observable<IResponse<IUser>>;
  completeProfile(data: IUser): Observable<IResponse<IUser>>;
  getUserPublic(data: IUser): Observable<IResponse<IUser>>;
}
export interface IUser {
  readonly _id?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly mobile?: string;
  readonly userName?: string;
  readonly isActive?: boolean;
  readonly status?: UserStatusEnum;
  readonly emailVerify?: boolean;
  readonly profilePicture?: string;
}
