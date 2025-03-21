import { NotificationDto } from "../dto";

class NotificationMapper {
  static toDto(notification: any): NotificationDto {
    return {
      id: notification.NotificationID,
      taskId: notification.TaskID,
      notificationType: notification.NotificationType,
      message: notification.Message,
      notifiedAt: notification.NotifiedAt,
    };
  }
}

export default NotificationMapper;
