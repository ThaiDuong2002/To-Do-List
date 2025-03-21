import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";
import { ERROR_MESSAGES } from "../constants";
import { CreateTaskDto, PatchTaskDto, TaskDto, UpdateTaskDto } from "../dto";
import { DatabaseErrorException } from "../exceptions";
import { TaskMapper } from "../mappers";

class TaskDao {
  public async create(taskFields: CreateTaskDto): Promise<string | null> {
    try {
      const fields = Object.keys(taskFields);
      const values = Object.values(taskFields);

      console.log(fields, values);

      const taskId = uuidv4();

      const query = `INSERT INTO Tasks (TaskId, ${fields.join(
        ", "
      )}) VALUES (?, ${fields.map(() => "?").join(", ")})`;

      const [result] = await db().query<ResultSetHeader>(query, [
        taskId,
        ...values,
      ]);

      if (result.affectedRows === 0) {
        return null;
      } else {
        return taskId;
      }
    } catch {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async findAll(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<TaskDto[]> {
    let query =
      "SELECT TaskID, Title, Description, DueDate, Priority, Status, CreatedAt, UpdatedAt FROM Tasks WHERE 1=1";
    const params = [];

    limit = limit || 10;
    page = page || 1;

    const offset = (page - 1) * limit;

    if (status) {
      query += " AND Status = ?";
      params.push(status);
    }
    if (priority) {
      query += " AND Priority = ?";
      params.push(priority);
    }
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    try {
      const [tasks] = await db().query<RowDataPacket[]>(query, params);

      const taskDtos = tasks.map((task) => {
        return TaskMapper.toDto(task);
      });

      return taskDtos;
    } catch {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async findOne(taskId: string): Promise<TaskDto | null> {
    try {
      const [tasks] = await db().query<RowDataPacket[]>(
        "SELECT TaskID, Title, Description, DueDate, Priority, Status, CreatedAt, UpdatedAt FROM Tasks WHERE TaskId = ?",
        [taskId]
      );

      if (tasks.length === 0) {
        return null;
      }

      return TaskMapper.toDto(tasks[0]);
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async update(taskId: string, taskFields: UpdateTaskDto): Promise<number> {
    try {
      const fields = Object.keys(taskFields);
      const values = Object.values(taskFields);

      const setFields = fields.map((field) => `${field} = ?`).join(", ");

      const [results] = await db().query<ResultSetHeader>(
        `UPDATE Tasks SET ${setFields} WHERE TaskId = ?`,
        [...values, taskId]
      );

      return results.affectedRows;
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async patch(taskId: string, taskFields: PatchTaskDto): Promise<number> {
    try {
      const fields = Object.keys(taskFields);
      const values = Object.values(taskFields);

      const setFields = fields.map((field) => `${field} = ?`).join(", ");

      const [result] = await db().query<ResultSetHeader>(
        `UPDATE Tasks SET ${setFields} WHERE TaskId = ?`,
        [...values, taskId]
      );

      return result.affectedRows;
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async delete(taskId: string): Promise<number> {
    try {
      const [result] = await db().query<ResultSetHeader>(
        "DELETE FROM Tasks WHERE TaskId = ?",
        [taskId]
      );

      return result.affectedRows;
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }
}

export default new TaskDao();
