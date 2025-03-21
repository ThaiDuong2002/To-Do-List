import { DependencyDao } from "../dao";
import { DependencyDto } from "../dto";
import DependencyServiceInterface from "./interfaces/dependency-service-interface";

class DependencyService implements DependencyServiceInterface {
  async list(id: string): Promise<DependencyDto[]> {
    return DependencyDao.list(id);
  }

  async create(id: string, dependsOnId: string): Promise<string | null> {
    return DependencyDao.create(id, dependsOnId);
  }

  async delete(id: string, dependsOnId: string): Promise<number> {
    return DependencyDao.delete(id, dependsOnId);
  }
}

export default new DependencyService();
