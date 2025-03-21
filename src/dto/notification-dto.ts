interface NotificationDto {
  id: number;
  taskId: number;
  notificationType: string;
  message: string;
  notifiedAt: Date;
}

export default NotificationDto;
