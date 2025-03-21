import { ERROR_MESSAGES } from "../constants";
import { DependencyDao } from "../dao";
import { DependencyDto } from "../dto";
import {
  CreateDependencyFailedException,
  DatabaseErrorException,
  DeleteDependencyFailedException,
  InternalErrorServerException,
} from "../exceptions";
import DependencyServiceInterface from "./interfaces/dependency-service-interface";

class DependencyService implements DependencyServiceInterface {
  async list(id: string): Promise<DependencyDto[]> {
    try {
      const result = await DependencyDao.list(id);
      return result;
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        throw new DatabaseErrorException(error.message);
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async create(id: string, dependsOnId: string): Promise<string> {
    try {
      const result = await DependencyDao.create(id, dependsOnId);

      if (result) {
        return result;
      } else {
        throw new CreateDependencyFailedException(
          ERROR_MESSAGES.CREATE_DEPENDENCY_FAILED
        );
      }
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        throw new DatabaseErrorException(error.message);
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async delete(id: string, dependsOnId: string): Promise<number> {
    try {
      const result = await DependencyDao.delete(id, dependsOnId);

      if (result == 1) {
        return result;
      } else {
        throw new DeleteDependencyFailedException(
          ERROR_MESSAGES.DELETE_DEPENDENCY_FAILED
        );
      }
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        throw new DatabaseErrorException(error.message);
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}

export default new DependencyService();
