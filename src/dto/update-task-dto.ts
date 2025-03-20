interface UpdateTaskDto {
  title: string;
  description: string | null;
  status: string;
  dueDate: string;
  priority: string;
}

export default UpdateTaskDto;
