interface TaskServiceInterface {
  list(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<any>;
  create(resource: any): Promise<any>;
  readById(id: string): Promise<any>;
  putById(id: string, resource: any): Promise<void>;
  patchById(id: string, resource: any): Promise<void>;
  deleteById(id: string): Promise<void>;
}

export default TaskServiceInterface;
