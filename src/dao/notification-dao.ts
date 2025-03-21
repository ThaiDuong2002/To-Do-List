import { RowDataPacket } from "mysql2";
import { db } from "../config";
import { ERROR_MESSAGES } from "../constants";
import { NotificationDto } from "../dto";
import { DatabaseErrorException } from "../exceptions";
import { NotificationMapper } from "../mappers";

class NotificationDao {
  async findAll(
    page?: number,
    limit?: number,
    type?: string
  ): Promise<NotificationDto[]> {
    const params = [];
    let query =
      "SELECT NotificationID, TaskID, NotificationType, Message, NotifiedAt FROM Notifications";
    limit = limit || 10;
    page = page || 1;

    const offset = (page - 1) * limit;

    if (type) {
      params.push(type);
      query += " WHERE NotificationType = ?";
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    try {
      const [notifications] = await db().query<RowDataPacket[]>(query, params);

      const notificationsDto: NotificationDto[] = notifications.map(
        (notification) => {
          return NotificationMapper.toDto(notification);
        }
      );

      return notificationsDto;
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }
}

export default new NotificationDao();
