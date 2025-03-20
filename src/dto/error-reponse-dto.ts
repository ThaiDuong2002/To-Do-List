interface ErrorResponseDto {
  errorMessage: string;
  httpStatus: number;
  apiPath: string;
  timestamp: string;
}

export default ErrorResponseDto;
