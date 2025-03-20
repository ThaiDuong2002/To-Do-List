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
    const { limit, page, status, priority } = req.query;

    const tasks = await TaskService.list(
      parseInt(limit as string),
      parseInt(page as string),
      status as string,
      priority as string
    );

    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.OK,
      message: "List of tasks",
      data: tasks,
    };

    res.status(HTTP_STATUS.OK).json(response);
  }

  async createTask(req: express.Request, res: express.Response) {
    const id = await TaskService.create(req.body);
    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.CREATED,
      message: "Task created",
      data: id,
    };
    res.status(HTTP_STATUS.CREATED).json(response);
  }

  async getTaskById(req: express.Request, res: express.Response) {
    const task = await TaskService.readById(req.params.taskId);

    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.OK,
      message: "Task details",
      data: task,
    };

    res.status(HTTP_STATUS.OK).json(response);
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
