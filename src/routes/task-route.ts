import express from "express";
import { TaskController } from "../controllers";
import {
  createDependencyValidation,
  createTaskValidation,
  patchTaskValidation,
  updateTaskValidation,
} from "../middlewares/validate";
import CommonRoutes from "./common-route";

class TaskRoutes extends CommonRoutes {
  private version: string = "/api/v1";

  constructor(app: express.Application) {
    super(app, "TaskRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`${this.version}/tasks`)
      .get(TaskController.listTasks)
      .post(createTaskValidation, TaskController.createTask);

    this.app
      .route(`${this.version}/tasks/:taskId`)
      .all(TaskController.all)
      .get(TaskController.getTaskById)
      .put(updateTaskValidation, TaskController.updateTask)
      .patch(patchTaskValidation, TaskController.patchTask)
      .delete(TaskController.deleteTask);

    this.app
      .route(`${this.version}/tasks/:taskId/dependencies`)
      .post(createDependencyValidation, TaskController.createTaskDependency)
      .get(TaskController.listTaskDependencies);

    this.app
      .route(`${this.version}/tasks/:taskId/dependencies/:dependsOnTaskId`)
      .delete(TaskController.deleteTaskDependency);

    return this.app;
  }
}

export default TaskRoutes;
