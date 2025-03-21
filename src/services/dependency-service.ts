import { ERROR_MESSAGES } from "../constants";
import { DependencyDao } from "../dao";
import { DependencyDto } from "../dto";
import {
  CircularDependenciesException,
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
        throw error;
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async create(id: string, dependsOnId: string): Promise<string> {
    try {
      const isCicurlarDependency = await DependencyDao.isCircularDependency(
        id,
        dependsOnId
      );

      if (isCicurlarDependency) {
        throw new CircularDependenciesException(
          ERROR_MESSAGES.CIRCULAR_DEPENDENCY(id, dependsOnId)
        );
      } else {
        const result = await DependencyDao.create(id, dependsOnId);

        if (result) {
          return result;
        } else {
          throw new CreateDependencyFailedException(
            ERROR_MESSAGES.CREATE_DEPENDENCY_FAILED
          );
        }
      }
    } catch (error) {
      if (
        error instanceof DatabaseErrorException ||
        error instanceof CircularDependenciesException ||
        error instanceof CreateDependencyFailedException
      ) {
        throw error;
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async delete(id: string, dependsOnId: string): Promise<void> {
    try {
      const result = await DependencyDao.delete(id, dependsOnId);

      if (result === 0) {
        throw new DeleteDependencyFailedException(
          ERROR_MESSAGES.DELETE_DEPENDENCY_FAILED
        );
      }
    } catch (error) {
      if (
        error instanceof DatabaseErrorException ||
        error instanceof DeleteDependencyFailedException
      ) {
        throw error;
      } else {
        throw new InternalErrorServerException(
          ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}

export default new DependencyService();
