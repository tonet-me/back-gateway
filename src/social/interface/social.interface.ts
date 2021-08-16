import { Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';

export interface ISocialService {
  addSocial(data: ISocial): Observable<IResponse<ISocial>>;
  updateSocial(data: ISocial): Observable<IResponse<ISocial>>;
  getOwnSocial(data: ISocial): Observable<IResponse<ISocial>>;
  getOwnSocials(data: ISocial): Observable<IResponse<ISocial>>;
  deleteOwnSocial(data: ISocial): Observable<IResponse<ISocial>>;
}

export interface ISocial {
  readonly _id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly icon?: string;
  readonly isActive?: boolean;
  readonly userId?: string;
}
