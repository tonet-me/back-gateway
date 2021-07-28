export class Responser {
  public readonly success;
  public readonly message;
  public readonly result;
  public readonly status;
  constructor(success, message, result, status = null) {
    this.success = success;
    this.message = message;
    this.result = result;
    this.status = status;
  }
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  result: T;
}
