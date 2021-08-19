export class Responser<T> {
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;
  public readonly status: number;
  constructor(success, message, result: T, status = null) {
    this.success = success;
    this.message = message;
    this.data = result;
    this.status = status;
  }
}
