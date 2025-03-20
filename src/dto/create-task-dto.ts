interface CreateTaskDto {
  title: string;
  description: string | null;
  dueDate: string;
  priority: string;
}

export default CreateTaskDto;
