import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { AuthOtpDTO } from '../dto/auth.otp.dto';

export interface IAuthService {
  makeOtp(data: IMakeOtpRequest): Observable<IResponse<MakeOtpResult>>;
}

export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface MakeOtpResult {
  code: number;
}
