import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";
import { CreateTaskDto, PatchTaskDto, TaskDto, UpdateTaskDto } from "../dto";
import { TaskMapper } from "../mappers";

class TaskDao {
  public async create(taskFields: CreateTaskDto): Promise<string> {
    try {
      const { title, description, dueDate, priority } = taskFields;
      const taskId = uuidv4();

      await db().query(
        "INSERT INTO Tasks (taskid, title, description, dueDate, priority) VALUES (?, ?, ?, ?, ?)",
        [taskId, title, description || "", dueDate, priority]
      );

      return taskId;
    } catch (error) {
      throw new Error("Error creating task: " + error);
    }
  }

  async findAll(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<TaskDto[]> {
    let query = "SELECT * FROM Tasks WHERE 1=1";
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
    } catch (error) {
      throw new Error("Error fetching tasks: " + error);
    }
  }
  async findOne(taskId: string) {
    try {
      const [tasks] = await db().query<RowDataPacket[]>(
        "SELECT * FROM Tasks WHERE TaskId = ?",
        [taskId]
      );

      if (tasks.length === 0) {
        return null;
      }

      return TaskMapper.toDto(tasks[0]);
    } catch (error) {
      throw new Error("Error fetching task: " + error);
    }
  }
  async update(taskId: string, task: UpdateTaskDto) {
    try {
      const { title, description, dueDate, priority, status } = task;

      if (description) {
        await db().query(
          "UPDATE Tasks SET Title = ?, Description = ?, DueDate = ?, Priority = ?, Status = ? WHERE TaskId = ?",
          [title, description, dueDate, priority, status, taskId]
        );
      } else {
        await db().query(
          "UPDATE Tasks SET Title = ?, DueDate = ?, Priority = ?, Status = ? WHERE TaskId = ?",
          [title, dueDate, priority, status, taskId]
        );
      }

      return taskId;
    } catch (error) {
      throw new Error("Error updating task: " + error);
    }
  }
  async patch(taskId: string, taskFields: PatchTaskDto) {}
  async delete(taskId: string) {}
}

export default new TaskDao();
