import { Observable } from 'rxjs';
import { IPaginateOption } from 'src/common/interface/paginationOption.interface';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IStateService {
  getCountry(data: Partial<ICountry>): Observable<IResponse<ICountry>>;
  getCountries(
    data: Partial<IPaginateOption>,
  ): Observable<IResponse<ICountry[]>>;
  getCity(data: Partial<ICity>): Observable<IResponse<ICity>>;
  getCities(data: Partial<IPaginateOption>): Observable<IResponse<ICity[]>>;
}

export interface ICountry {
  readonly _id: string;
  readonly name: string;
}

export interface ICity {
  readonly _id: string;
  readonly name: string;
}
