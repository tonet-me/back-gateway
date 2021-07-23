import { Observable } from 'rxjs';
import { RegisterDTO } from '../dto/register.dto';

export interface UserService {
  register(data: RegisterDTO): Observable<any>;
}

export interface RegisterRequest {
  firstName: string;
  lastNamee: string;
  password: string;
  rePassword: string;
  email: string;
  mobile: string;
  profilePhoto: string;
}

export interface User {
  firstName: string;
  lastNamee: string;
  email: string;
  mobile: string;
  profilePhoto: string;
}

export interface RegisterResponse {
  message: string;
  data: User;
}
