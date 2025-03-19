import { instanceToPlain } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SERVER_CONSTANTS } from "../constants";
import ErrorResponseDto from "../dto/error-reponse-dto";

const errorHelper = {
  notFound: (req: Request, res: Response, _: NextFunction) => {
    const errorDto = new ErrorResponseDto(
      SERVER_CONSTANTS.ROUTE_NOT_FOUND,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      req.originalUrl,
      new Date().toLocaleString()
    );

    const error = instanceToPlain(errorDto);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  },
  errorHandler: (err: Error, req: Request, res: Response, _: NextFunction) => {
    const errorDto = new ErrorResponseDto(
      err.message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      req.originalUrl,
      new Date().toLocaleString()
    );

    const error = instanceToPlain(errorDto);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  },
};

export default errorHelper;
