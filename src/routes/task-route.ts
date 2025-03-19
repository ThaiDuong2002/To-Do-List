import express from "express";
import { taskController } from "../controllers";

const taskRouter = express.Router();

// Api routes for tasks
taskRouter.get("/api/v1/tasks", taskController.getTasks);
taskRouter.get("/api/v1/tasks/:taskId", taskController.getTask);
taskRouter.post("/api/v1/tasks", taskController.createTask);
taskRouter.put("/api/v1/tasks/:taskId", taskController.updateTask);
taskRouter.delete("/api/v1/tasks/:taskId", taskController.deleteTask);

// Api routes for task's dependencies
taskRouter.post(
  "/api/v1/tasks/:taskId/dependencies",
  taskController.createTaskDependency
);
taskRouter.get(
  "/api/v1/tasks/:taskId/dependencies",
  taskController.getTaskDependencies
);
taskRouter.delete(
  "/api/v1/tasks/:taskId/dependencies/:dependencyId",
  taskController.deleteTaskDependency
);

export default taskRouter;
