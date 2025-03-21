import express from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";
import { ErrorResponseDto, ResponseDto } from "../dto";
import {
  DatabaseErrorException,
  InternalErrorServerException,
} from "../exceptions";
import { NotificationService } from "../services";

class NotificationController {
  async listNotifications(req: express.Request, res: express.Response) {
    try {
      const { limit, page, type } = req.query;
      const notifications = await NotificationService.list(
        parseInt(limit as string),
        parseInt(page as string),
        type as string
      );

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "Notifications fetched successfully",
        data: notifications,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          errorMessage: error.message,
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          errorMessage: error.message,
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else {
        const response: ErrorResponseDto = {
          errorMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }
}

export default new NotificationController();
