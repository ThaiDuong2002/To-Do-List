import { TaskDao } from "../dao";
import { CreateTaskDto, PatchTaskDto, TaskDto, UpdateTaskDto } from "../dto";
import TaskServiceInterface from "./interfaces/task-service-interface";

class TaskService implements TaskServiceInterface {
  async list(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<TaskDto[]> {
    return TaskDao.findAll(limit, page, status, priority);
  }

  async create(resource: CreateTaskDto): Promise<string | null> {
    return TaskDao.create(resource);
  }

  async readById(id: string): Promise<TaskDto> {
    const result = await TaskDao.findOne(id);
    if (!result) {
      throw new Error("Task not found");
    }
    return result;
  }

  async putById(id: string, resource: UpdateTaskDto): Promise<number> {
    return TaskDao.update(id, resource);
  }

  async patchById(id: string, resource: PatchTaskDto): Promise<number> {
    return TaskDao.patch(id, resource);
  }

  async deleteById(id: string): Promise<number> {
    return TaskDao.delete(id);
  }
}

export default new TaskService();
