interface NotificationServiceInterface {
  list(limit?: number, page?: number, type?: string): Promise<any>;
}

export default NotificationServiceInterface;
