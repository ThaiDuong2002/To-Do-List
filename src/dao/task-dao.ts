import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";
import { CreateTaskDto, TaskDto } from "../dto";
import { TaskMapper } from "../mappers";

class TaskDao {
  public async create(taskFields: CreateTaskDto): Promise<string> {
    try {
      const { title, description, status, dueDate, priority } = taskFields;
      const taskId = uuidv4();

      await db().query(
        "INSERT INTO Tasks (taskid, title, description, status, dueDate, priority) VALUES (?, ?, ?, ?, ?, ?)",
        [
          taskId,
          title,
          description,
          status || "Pending",
          dueDate,
          priority || "Medium",
        ]
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
  async update(task: TaskDto) {}
  async delete(taskId: string) {}
}

export default new TaskDao();
