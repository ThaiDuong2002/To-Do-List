import { DependencyDao } from "../dao";
import DependencyServiceInterface from "./interfaces/dependency-service-interface";

class DependencyService implements DependencyServiceInterface {
  async list(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async create(id: string, dependsOnId: string): Promise<string | null> {
    return DependencyDao.create(id, dependsOnId);
  }

  async delete(id: string, dependsOnId: string): Promise<number> {
    return DependencyDao.delete(id, dependsOnId);
  }
}

export default new DependencyService();
