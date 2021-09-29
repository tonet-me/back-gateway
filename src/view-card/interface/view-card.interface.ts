import { Observable } from 'rxjs';
import { IPaginateOption } from 'src/common/interface/paginationOption.interface';
import { IResponse } from 'src/common/interface/responser.interface';

export interface IViewCardService {
  addViewCard(data: Partial<IViewCard>): Observable<IResponse<IViewCard>>;
  getOwnViewsCard(
    data: Partial<IPaginateOption>,
  ): Observable<IResponse<IViewCard>>;
}

interface Browser {
  readonly name: string;
  readonly version: string;
  readonly major: string;
}

interface Engine {
  readonly name: string;
  readonly version: string;
}

interface OS {
  readonly name: string;
  readonly version: string;
}

interface Device {
  readonly vendor: string;
  readonly model: string;
  readonly type: string;
}

interface CPU {
  readonly architecture: string;
}

export interface IViewCard {
  readonly cardId: string;
  readonly ua: string;
  readonly browser: Partial<Browser>;
  readonly engine: Partial<Engine>;
  readonly os: Partial<OS>;
  readonly device: Partial<Device>;
  readonly cpu: Partial<CPU>;
}
