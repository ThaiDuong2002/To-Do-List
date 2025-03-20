interface CreateTaskDto {
  title: string;
  description: string;
  status: string | null;
  dueDate: string;
  priority: string | null;
}

export default CreateTaskDto;
