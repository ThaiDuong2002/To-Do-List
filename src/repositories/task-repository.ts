import { v4 as uuidv4 } from "uuid";
import { db } from "../config";
import { CreateTaskDto, TaskDto } from "../dto";

class TaskRepository {
  async create(task: CreateTaskDto): Promise<string> {
    try {
      const { title, description, status, dueDate, priority } = task;
      const taskId = uuidv4();

      await db().query(
        "INSERT INTO Tasks (taskid, title, description, status, dueDate, priority) VALUES (?, ?, ?, ?, ?, ?)",
        [taskId, title, description, status, dueDate, priority]
      );

      return taskId;
    } catch (error) {
      throw new Error("Error creating task: " + error);
    }
  }
  async findAll() {}
  async findOne(taskId: string) {}
  async update(task: TaskDto) {}
  async delete(taskId: string) {}
}

export default new TaskRepository();
