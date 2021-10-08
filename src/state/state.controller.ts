import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { QueryResolver } from 'src/common/utils/query.resolver';
import { CityIdDTO } from './dto/city.id.dto';
import { CityQueryResolversDTO } from './dto/city.pagination.dto';
import { CountryIdDTO } from './dto/country.id.dto';
import { CountryQueryResolversDTO } from './dto/country.pagination.dto';
import { ICity, ICountry, IStateService } from './interface/state.interface';

@Controller('state')
export class StateController {
  private stateService: IStateService;

  constructor(@Inject('STATE_PACKAGE') private stateClient: ClientGrpc) {}

  onModuleInit() {
    this.stateService =
      this.stateClient.getService<IStateService>('StateService');
  }

  @Get('/countries')
  getCountries(
    @Query() query: CountryQueryResolversDTO,
  ): Observable<IResponse<ICountry>> {
    const queryResolver: QueryResolver = new QueryResolver(query);
    return from(this.stateService.getCountries(queryResolver.query));
  }

  @Get('/countries/:countryId')
  getCountry(@Param() params: CountryIdDTO): Observable<IResponse<ICountry>> {
    return from(this.stateService.getCountry({ _id: params.countryId }));
  }

  @Get('/cities')
  getCities(
    @Query() query: CityQueryResolversDTO,
  ): Observable<IResponse<ICity>> {
    const queryResolver: QueryResolver = new QueryResolver(query);
    return from(this.stateService.getCities(queryResolver.query));
  }

  @Get('/cities/:cityId')
  getCity(@Param() params: CityIdDTO): Observable<IResponse<ICity>> {
    return from(this.stateService.getCity({ _id: params.cityId }));
  }
}
