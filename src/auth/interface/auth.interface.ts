import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IAuthService {
  makeOtp(data: IMakeOtpRequest): Observable<IResponse<IMakeOtpResult>>;
  loginOtp(data: ILoginOtp): Observable<IResponse<ILoginOtpResult>>;
  validateAccessToken(
    data: IValidateAccessTokenRequest,
  ): Observable<IResponse<any>>;
  getRefreshToken(
    data: IGetRefreshTokenRequest,
  ): Observable<IResponse<ILoginOtpResult>>;
}

/**
 * make otp interface
 */
export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface IMakeOtpResult {
  code: number;
}

/**
 * check verification code
 */

export interface ILoginOtp {
  phoneNumber: string;
  code: number;
}
export interface IGetRefreshTokenRequest {
  refreshToken: string;
}

export interface ILoginOtpResult {
  accessToken: string;
  refreshToken: string;
}

export interface IValidateAccessTokenRequest {
  accessToken: string;
}
