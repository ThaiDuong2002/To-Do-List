import express from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";
import { ErrorResponseDto, ResponseDto } from "../dto";
import {
  CreateTaskFailedException,
  DatabaseErrorException,
  DeleteTaskFailedException,
  InternalErrorServerException,
  TaskNotFoundException,
  UpdateTaskFailedException,
} from "../exceptions";
import { DependencyService, TaskService } from "../services";

class TaskController {
  async all(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next();
  }

  async listTasks(req: express.Request, res: express.Response) {
    try {
      const { limit, page, status, priority } = req.query;

      const tasks = await TaskService.list(
        parseInt(limit as string),
        parseInt(page as string),
        status as string,
        priority as string
      );

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "List of tasks",
        data: tasks,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: "Something went wrong! Please try again later.",
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async createTask(req: express.Request, res: express.Response) {
    try {
      const id = await TaskService.create(req.body);
      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.CREATED,
        message: "Task created successfully.",
        data: id,
      };

      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof CreateTaskFailedException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.BAD_REQUEST,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.BAD_REQUEST).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: "Something went wrong! Please try again later.",
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async getTaskById(req: express.Request, res: express.Response) {
    try {
      const task = await TaskService.readById(req.params.taskId);

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "Task details",
        data: task,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof TaskNotFoundException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.NOT_FOUND,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.NOT_FOUND).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: "Something went wrong! Please try again later.",
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async updateTask(req: express.Request, res: express.Response) {
    try {
      await TaskService.putById(req.params.taskId, req.body);

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "Task updated.",
        data: `Task ${req.params.taskId} updated successfully`,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof UpdateTaskFailedException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.NOT_FOUND,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.NOT_FOUND).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async patchTask(req: express.Request, res: express.Response) {
    try {
      await TaskService.patchById(req.params.taskId, req.body);

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "Task updated.",
        data: `Task ${req.params.taskId} updated successfully`,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof UpdateTaskFailedException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.NOT_FOUND,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.NOT_FOUND).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async deleteTask(req: express.Request, res: express.Response) {
    try {
      await TaskService.deleteById(req.params.taskId);

      const response: ResponseDto = {
        httpStatus: HTTP_STATUS.OK,
        message: "Task deleted.",
        data: `Task ${req.params.taskId} deleted successfully`,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      if (error instanceof DatabaseErrorException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof InternalErrorServerException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      } else if (error instanceof DeleteTaskFailedException) {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.NOT_FOUND,
          errorMessage: error.message,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.NOT_FOUND).json(response);
      } else {
        const response: ErrorResponseDto = {
          httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          errorMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          apiPath: req.path,
          timestamp: new Date().toISOString(),
        };

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  }

  async createTaskDependency(req: express.Request, res: express.Response) {
    const id = await DependencyService.create(
      req.params.taskId,
      req.body.dependsOnTaskId
    );

    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.CREATED,
      message: "Task dependency created",
      data: id,
    };

    res.status(HTTP_STATUS.CREATED).json(response);
  }

  async listTaskDependencies(req: express.Request, res: express.Response) {
    const dependencies = await DependencyService.list(req.params.taskId);

    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.OK,
      message: "List of task dependencies",
      data: dependencies,
    };

    res.status(HTTP_STATUS.OK).json(response);
  }

  async deleteTaskDependency(req: express.Request, res: express.Response) {
    const deleted = await DependencyService.delete(
      req.params.taskId,
      req.params.dependsOnTaskId
    );

    const response: ResponseDto = {
      httpStatus: HTTP_STATUS.OK,
      message: "Task dependency deleted",
      data: `Task dependency ${deleted} deleted successfully`,
    };

    res.status(HTTP_STATUS.OK).json(response);
  }
}

export default new TaskController();
