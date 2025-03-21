import { ERROR_MESSAGES } from "../constants";
import { NotificationDao } from "../dao";
import { NotificationDto } from "../dto";
import {
  DatabaseErrorException,
  InternalErrorServerException,
} from "../exceptions";
import NotificationServiceInterface from "./interfaces/notification-service-interface";

class NotificationService implements NotificationServiceInterface {
  async list(
    limit?: number,
    page?: number,
    type?: string
  ): Promise<NotificationDto[]> {
    try {
      const result = await NotificationDao.findAll(limit, page, type);

      return result;
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        throw error;
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}

export default new NotificationService();
