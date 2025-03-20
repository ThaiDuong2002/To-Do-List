import { TaskDao } from "../dao";
import { CreateTaskDto } from "../dto";
import CRUD from "./crud-interface";

class TaskService implements CRUD {
  list(limit: number, page: number, filter: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(resource: CreateTaskDto): Promise<any> {
    return TaskDao.addTask(resource);
  }
  readById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  putById(id: string, resource: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  patchById(id: string, resource: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default new TaskService();
