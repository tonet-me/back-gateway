import { Observable } from 'rxjs';
import { IPaginateOption } from 'src/common/interface/paginationOption.interface';
import { IResponse } from 'src/common/interface/responser.interface';
import { CardLanguageEnum } from '../enum/card.language.dto';
import { CardSocialTitleEnum } from '../enum/card.socail.title.dto';

export interface ICardService {
  addCard(data: Partial<ICard>): Observable<IResponse<ICard>>;
  updateCard(data: Partial<ICard>): Observable<IResponse<ICard>>;
  getOwnCard(data: Partial<ICard>): Observable<IResponse<ICard>>;
  getOwnCards(
    data: Partial<ICard & IPaginateOption>,
  ): Observable<IResponse<ICard[]>>;
  getPublicCardByUsername(data: Partial<ICard>): Observable<IResponse<ICard>>;
  getPublicCardByQrcode(data: Pick<ICard, '_id'>): Observable<IResponse<ICard>>;
  deleteOwnCard(data: Partial<ICard>): Observable<IResponse<ICard>>;
  checkCardnameAvailable(
    data: Partial<ICard>,
  ): Observable<IResponse<CardAvalable>>;
}

export interface CardAvalable {
  readonly cardAvailable: boolean;
}

interface Phone {
  readonly title: string;
  readonly content: string;
  readonly order: number;
}

interface Social {
  readonly title: CardSocialTitleEnum;
  readonly content: string;
  readonly order: number;
}

interface Mail {
  readonly content: string;
  readonly order: number;
}

interface Location {
  readonly coordinates: number[];
  readonly type: string;
}
interface Address {
  readonly title: string;
  readonly countryId: string;
  readonly cityId: string;
  readonly address: string;
  readonly location: Location;
  readonly order: number;
}

export interface ICard {
  readonly _id: string;
  readonly userId: string;
  readonly name: string;
  readonly title: string;
  readonly about: string;
  readonly photo: string;
  readonly website: string;
  readonly qrcode: string;
  readonly userName: string;
  readonly phones: Phone[];
  readonly socials: Social[];
  readonly mails: Mail[];
  readonly addresses: Address[];
  readonly verified: boolean;
  readonly isActive: boolean;
  readonly language: CardLanguageEnum;
}
