export interface IResponse<T> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
}
