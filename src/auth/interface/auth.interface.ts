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
}

export interface IOauthGenerateToken {
  email: string;
}
export interface IGetRefreshTokenRequest {
  refreshToken: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  status?: string;
}

export interface IValidateAccessTokenRequest {
  accessToken: string;
}
