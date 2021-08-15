import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IUserService {
  updateProfile(
    data: IProfileUpdateRequest,
  ): Observable<IResponse<IProfileUpdateResult>>;
}

/**
 * user profile update interface
 */
export interface IProfileUpdateRequest {
  readonly userId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly profilePicture: string;
}

export interface IProfileUpdateResult {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly profilePicture: string;
}

export interface IUser {
  _id: string;
}
