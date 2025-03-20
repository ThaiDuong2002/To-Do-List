import express from "express";

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
    res.send("Task created");
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
