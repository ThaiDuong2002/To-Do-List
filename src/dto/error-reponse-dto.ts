import { Expose } from "class-transformer";

class ErrorResponseDto {
  @Expose()
  private errorMessage!: string;

  @Expose()
  private httpStatus!: number;

  @Expose()
  private apiPath!: string;

  @Expose()
  private timestamp!: string;

  constructor(
    errorMessage: string,
    httpStatus: number,
    apiPath: string,
    timestamp: string
  ) {
    this.errorMessage = errorMessage;
    this.httpStatus = httpStatus;
    this.apiPath = apiPath;
    this.timestamp = timestamp;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  public getHttpStatus(): number {
    return this.httpStatus;
  }

  public getApiPath(): string {
    return this.apiPath;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public setHttpStatus(httpStatus: number): void {
    this.httpStatus = httpStatus;
  }

  public setApiPath(apiPath: string): void {
    this.apiPath = apiPath;
  }

  public setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }
}

export default ErrorResponseDto;
