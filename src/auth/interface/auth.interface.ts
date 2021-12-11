import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IAuthService {
  loginWithOauth(
    data: IOauthGenerateToken,
  ): Observable<IResponse<ILoginResult>>;
  validateAccessToken(
    data: IValidateAccessTokenRequest,
  ): Observable<IResponse<any>>;
  getRefreshToken(
    data: IGetRefreshTokenRequest,
  ): Observable<IResponse<ILoginResult>>;
  checkEmailBeforRegister(
    data: ICheckEmailBeforRegisterRequest,
  ): Observable<IResponse<ICheckEmailBeforRegisterResponse>>;

  registerWithEmail(
    data: IRegisterWithEmailRequest,
  ): Observable<IResponse<ILoginResult>>;

  loginWithEmail(
    data: ILoginWithEmailRequest,
  ): Observable<IResponse<ILoginResult>>;
}

export interface IOauthGenerateToken {
  email: string;
  oauthProvider: string;
}
export interface IGetRefreshTokenRequest {
  refreshToken: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  status?: string;
  oauthRegistered?: boolean;
  oauthProvider?: string;
}

export interface IValidateAccessTokenRequest {
  accessToken: string;
}

export interface ICheckEmailBeforRegisterRequest {
  email: string;
}

export interface ICheckEmailBeforRegisterResponse {
  email: string;
  registered: boolean;
}

export interface IRegisterWithEmailRequest {
  email: string;
  password: string;
  code: number;
}

export interface ILoginWithEmailRequest {
  email: string;
  password: string;
}
