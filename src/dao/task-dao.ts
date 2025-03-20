import { CreateTaskDto } from "../dto";
import { TaskRepository } from "../repositories";

class TaskDao {
  private taskRepository = TaskRepository;

  public async addTask(taskFields: CreateTaskDto) {
    return this.taskRepository.create(taskFields);
  }
}

export default new TaskDao();
