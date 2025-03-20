interface CRUD {
  list(
    limit: number,
    page: number,
    status?: string,
    priority?: string
  ): Promise<any>;
  create(resource: any): Promise<any>;
  readById(id: string): Promise<any>;
  putById(id: string, resource: any): Promise<string>;
  patchById(id: string, resource: any): Promise<string>;
  deleteById(id: string): Promise<string>;
}

export default CRUD;
