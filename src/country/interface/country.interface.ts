import { Observable } from 'rxjs';
import { IPaginateOption } from 'src/common/interface/paginationOption.interface';
import { IResponse } from 'src/common/interface/responser.interface';

export interface ICountryService {
  getCountry(data: Partial<ICountry>): Observable<IResponse<ICountry>>;
  getCountries(
    data: Partial<ICountryPaginate>,
  ): Observable<IResponse<ICountry>>;
}

export interface ICountry {
  readonly _id: string;
  readonly name: string;
}

interface ICountryFilters {
  readonly name: string;
}

interface ICountryPaginate {
  readonly paginationOptions: IPaginateOption;
  readonly filters: ICountryFilters;
}