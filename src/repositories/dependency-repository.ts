import { DependencyDto } from "../dto";

class DependencyRepository {
  async create(task: DependencyDto) {}
  async findAll() {}
  async findOne(taskId: string) {}
  async update(task: DependencyDto) {}
  async delete(taskId: string) {}
}

export default new DependencyRepository();
