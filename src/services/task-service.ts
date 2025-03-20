import { TaskDao } from "../dao";
import { CreateTaskDto, PatchTaskDto, TaskDto, UpdateTaskDto } from "../dto";
import CRUD from "./crud-interface";

class TaskService implements CRUD {
  list(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<TaskDto[]> {
    return TaskDao.findAll(limit, page, status, priority);
  }

  create(resource: CreateTaskDto): Promise<any> {
    return TaskDao.create(resource);
  }
  
  readById(id: string): Promise<any> {
    return TaskDao.findOne(id);
  }

  putById(id: string, resource: UpdateTaskDto): Promise<string> {
    return TaskDao.update(id, resource);
  }

  patchById(id: string, resource: PatchTaskDto): Promise<string> {
    return TaskDao.patch(id, resource);
  }

  deleteById(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default new TaskService();
