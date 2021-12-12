import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { UserStatusEnum } from '../dto/update.profile.dto';

export interface IUserService {
  getProfile(data: Partial<IUser>): Observable<IResponse<IUser>>;
  updateProfile(data: Partial<IUser>): Observable<IResponse<IUser>>;
  changePassword(data: Partial<IUser>): Observable<IResponse<IUser>>;
  completeProfileWithOauth(data: Partial<IUser>): Observable<IResponse<IUser>>;
  completeProfileWithEmail(data: Partial<IUser>): Observable<IResponse<IUser>>;
  requestCodeForForgetPassword(
    data: Partial<IUser>,
  ): Observable<IResponse<IRequestCodeForForgetPassword>>;
  deleteProfilePhoto(data: Partial<IUser>): Observable<IResponse<IUser>>;
  forgetPasswordConform(
    data: IForgetPasswordConform,
  ): Observable<IResponse<IUser>>;
}

export interface IRequestCodeForForgetPassword {
  email: string;
  canUse: boolean;
}

export interface IForgetPasswordConform {
  email: string;
  password: string;
  code: number;
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
  readonly oauthRegistered: boolean;
}
