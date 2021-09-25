export interface IResponse<T> {
  readonly success: boolean;
  message: string;
  readonly data: T;
}
