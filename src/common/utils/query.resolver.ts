import { IPaginateOption } from '../interface/paginationOption.interface';

export class QueryResolver {
  private filters: object = {};
  private paginationOptions: object = {};
  private sort: object = {};
  private page: number;
  private limit: number;
  public query: IPaginateOption;
  constructor(query: any) {
    this.sortInit(query.sort);
    this.filterInit(query.filters);
    this.page = query.page;
    this.limit = query.limit;
    this.paginationOptions = {
      sort: this.sort,
      limit: this.limit,
      page: this.page,
    };
    this.query = {
      paginationOptions: this.paginationOptions,
      filters: this.filters,
    };
  }

  private sortInit(sort: any) {
    if (sort && sort instanceof Array && sort.length) {
      for (const item of sort) {
        const sortArray = item.split('_');
        Object.assign(this.sort, {
          [sortArray[0]]: sortArray[1] === 'asc' ? 1 : -1,
        });
      }
    } else if (sort) {
      const sortArray = sort.split('_');
      Object.assign(this.sort, {
        [sortArray[0]]: sortArray[1] === 'asc' ? 1 : -1,
      });
    } else {
      Object.assign(this.sort, { createdAt: -1 });
    }
  }
  private filterInit(filters: any) {
    filters?.name != undefined
      ? (filters.name = new RegExp(`.*${filters.name}.*`))
      : undefined;
    this.filters = filters;
  }
}
