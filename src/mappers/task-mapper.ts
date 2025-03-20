import { TaskDto } from "../dto";

class TaskMapper {
  static toDto(task: any): TaskDto {
    return {
      id: task.TaskID,
      title: task.Title,
      description: task.Description,
      status: task.Status,
      dueDate: task.DueDate,
      priority: task.Priority,
      createdAt: task.CreatedAt,
      updatedAt: task.UpdatedAt,
    };
  }
}

export default TaskMapper;
