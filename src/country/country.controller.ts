import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { QueryResolver } from 'src/common/utils/query.resolver';
import { CountryIdDTO } from './dto/country.id.dto';
import { CountryQueryResolversDTO } from './dto/country.pagination.dto';
import { ICountry, ICountryService } from './interface/country.interface';

@Controller('country')
export class CountryController {
  private countryService: ICountryService;

  constructor(@Inject('COUNTRY_PACKAGE') private countryClient: ClientGrpc) {}

  onModuleInit() {
    this.countryService =
      this.countryClient.getService<ICountryService>('CountryService');
  }

  @Get('/')
  getCountries(
    @Query() query: CountryQueryResolversDTO,
  ): Observable<IResponse<ICountry>> {
    const queryResolver: QueryResolver = new QueryResolver(query);
    return from(this.countryService.getCountries(queryResolver.query));
  }

  @Get('/:countryId')
  getCountry(@Param() params: CountryIdDTO): Observable<IResponse<ICountry>> {
    return from(this.countryService.getCountry({ _id: params.countryId }));
  }
}
