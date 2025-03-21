interface CreateTaskDto {
  title: string;
  description: string | null;
  dueDate: string;
  priority: string | null;
  status: string | null;
}

export default CreateTaskDto;
