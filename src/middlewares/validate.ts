import express from "express";
import { AnyZodObject } from "zod";
import { HTTP_STATUS } from "../constants";
import { ErrorResponseDto } from "../dto";
import {
  createDependencyScheme,
  createTaskScheme,
  patchTaskScheme,
  updateTaskScheme,
} from "../schemas";

const validate =
  (schema: AnyZodObject) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const response: ErrorResponseDto = {
        httpStatus: HTTP_STATUS.BAD_REQUEST,
        errorMessage: error.errors,
        apiPath: req.path,
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(response);
    }
  };

const createTaskValidation = validate(createTaskScheme);
const updateTaskValidation = validate(updateTaskScheme);
const createDependencyValidation = validate(createDependencyScheme);
const patchTaskValidation = validate(patchTaskScheme);

export default validate;
export {
  createDependencyValidation,
  createTaskValidation,
  patchTaskValidation,
  updateTaskValidation,
};
