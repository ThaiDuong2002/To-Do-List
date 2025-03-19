import { Request, Response } from "express";

const taskController = {
  getTasks: async (req: Request, res: Response) => {
    res.json({ message: "Get all tasks" });
  },
  getTask: async (req: Request, res: Response) => {
    res.json({ message: "Get a task" });
  },
  updateTask: async (req: Request, res: Response) => {
    res.json({ message: "Update a task" });
  },
  createTask: async (req: Request, res: Response) => {
    res.json({ message: "Create a task" });
  },
  deleteTask: async (req: Request, res: Response) => {
    res.json({ message: "Delete a task" });
  },
  createTaskDependency: async (req: Request, res: Response) => {
    res.json({ message: "Create a task dependency" });
  },
  getTaskDependencies: async (req: Request, res: Response) => {
    res.json({ message: "Get task dependencies" });
  },
  deleteTaskDependency: async (req: Request, res: Response) => {
    res.json({ message: "Delete a task dependency" });
  },
};

export default taskController;
