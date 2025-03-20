import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SERVER_CONSTANTS } from "../constants";
import { ErrorResponseDto } from "../dto";

class ErrorHelper {
  notFound(req: Request, res: Response, _: NextFunction) {
    const errorDto: ErrorResponseDto = {
      errorMessage: SERVER_CONSTANTS.INTERNAL_SERVER_ERROR,
      httpStatus: HTTP_STATUS.NOT_FOUND,
      apiPath: req.originalUrl,
      timestamp: new Date().toLocaleString(),
    };

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorDto);
  }
  errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
    const errorDto: ErrorResponseDto = {
      errorMessage: err.message,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      apiPath: req.originalUrl,
      timestamp: new Date().toLocaleString(),
    };

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorDto);
  }
}

export default new ErrorHelper();
