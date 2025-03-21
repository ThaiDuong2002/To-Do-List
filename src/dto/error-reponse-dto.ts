interface ErrorResponseDto {
  errorMessage: any;
  httpStatus: number;
  apiPath: string;
  timestamp: string;
}

export default ErrorResponseDto;
