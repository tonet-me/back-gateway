import { Observable } from 'rxjs';
import { AuthOtpDTO } from '../dto/auth.otp.dto';

export interface IAuthService {
  makeOtp(data: IMakeOtpRequest): Observable<IMakeOtpResponse>;
}

export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface IMakeOtpResponse {
  code: string;
  // jwt: string;
  status: string;
}
