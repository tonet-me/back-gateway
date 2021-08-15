import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IAuthService {
  makeOtp(data: IMakeOtpRequest): Observable<IResponse<IMakeOtpResult>>;
  loginOtp(data: ILoginOtp): Observable<IResponse<ILoginOtpResult>>;
  validateAccessToken(data: ILoginOtpResult): Observable<IResponse<any>>;
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

export interface ILoginOtpResult {
  accessToken: string;
}
