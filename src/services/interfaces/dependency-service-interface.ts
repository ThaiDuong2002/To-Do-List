interface DependencyServiceInterface {
  list(id: string): Promise<any>;
  create(id: string, dependsOnId: string): Promise<any>;
  delete(id: string, dependsOnId: string): Promise<number>;
}

export default DependencyServiceInterface;
