import express from "express";
import notificationController from "../controllers/notification-controller";
import CommonRoutes from "./common-route";

class NotificationRoutes extends CommonRoutes {
  private version: string = "/api/v1";

  constructor(app: express.Application) {
    super(app, "TaskRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`${this.version}/notifications`)
      .get(notificationController.listNotifications);

    return this.app;
  }
}

export default NotificationRoutes;
