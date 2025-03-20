interface TaskServiceInterface {
  list(
    limit?: number,
    page?: number,
    status?: string,
    priority?: string
  ): Promise<any>;
  create(resource: any): Promise<any>;
  readById(id: string): Promise<any>;
  putById(id: string, resource: any): Promise<number>;
  patchById(id: string, resource: any): Promise<number>;
  deleteById(id: string): Promise<number>;
}

export default TaskServiceInterface;
