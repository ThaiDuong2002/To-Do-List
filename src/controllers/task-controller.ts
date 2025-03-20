import express from "express";
import { HTTP_STATUS } from "../constants";
import { ResponseDto } from "../dto";
import { TaskService } from "../services";

class TaskController {
  async all(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next();
  }

  async listTasks(req: express.Request, res: express.Response) {
    res.send("List of tasks");
  }

  async createTask(req: express.Request, res: express.Response) {
    const id = await TaskService.create(req.body);
    const response: ResponseDto = {
      message: "Task created",
      data: id,
      httpStatus: HTTP_STATUS.CREATED,
    };
    res.status(HTTP_STATUS.CREATED).json(response);
  }

  async getTaskById(req: express.Request, res: express.Response) {
    res.send("Task details");
  }

  async updateTask(req: express.Request, res: express.Response) {
    res.send("Task updated");
  }

  async deleteTask(req: express.Request, res: express.Response) {
    res.send("Task deleted");
  }

  async createTaskDependency(req: express.Request, res: express.Response) {
    res.send("Task dependency created");
  }

  async listTaskDependencies(req: express.Request, res: express.Response) {
    res.send("List of task dependencies");
  }

  async deleteTaskDependency(req: express.Request, res: express.Response) {
    res.send("Task dependency deleted");
  }
}

export default new TaskController();
