import { ERROR_MESSAGES } from "../constants";
import { TaskDao } from "../dao";
import { CreateTaskDto, PatchTaskDto, TaskDto, UpdateTaskDto } from "../dto";
import {
  CreateTaskFailedException,
  DatabaseErrorException,
  DeleteTaskFailedException,
  InternalErrorServerException,
  TaskNotFoundException,
  UpdateTaskFailedException,
} from "../exceptions";
import TaskServiceInterface from "./interfaces/task-service-interface";

class TaskService implements TaskServiceInterface {
  async list(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<TaskDto[]> {
    try {
      const result = await TaskDao.findAll(limit, page, status, priority);

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

  async create(resource: CreateTaskDto): Promise<string> {
    try {
      const result = await TaskDao.create(resource);
      if (!result) {
        throw new CreateTaskFailedException(
          ERROR_MESSAGES.TASK_CREATION_FAILED
        );
      }
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

  async readById(id: string): Promise<TaskDto> {
    try {
      const result = await TaskDao.findOne(id);
      if (result) {
        return result;
      } else {
        throw new TaskNotFoundException(ERROR_MESSAGES.TASK_NOT_FOUND(id));
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

  async putById(id: string, resource: UpdateTaskDto): Promise<void> {
    try {
      const result = await TaskDao.update(id, resource);
      if (result === 0) {
        throw new UpdateTaskFailedException(ERROR_MESSAGES.TASK_UPDATE_FAILED);
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

  async patchById(id: string, resource: PatchTaskDto): Promise<void> {
    try {
      const result = await TaskDao.patch(id, resource);
      if (result === 0) {
        throw new UpdateTaskFailedException(ERROR_MESSAGES.TASK_UPDATE_FAILED);
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

  async deleteById(id: string): Promise<void> {
    try {
      const result = await TaskDao.delete(id);
      if (result === 0) {
        throw new DeleteTaskFailedException(
          ERROR_MESSAGES.TASK_DELETION_FAILED
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

export default new TaskService();
