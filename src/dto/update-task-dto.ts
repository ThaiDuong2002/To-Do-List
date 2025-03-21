interface UpdateTaskDto {
  title: string | null;
  description: string | null;
  status: string | null;
  dueDate: string | null;
  priority: string | null;
}

export default UpdateTaskDto;
