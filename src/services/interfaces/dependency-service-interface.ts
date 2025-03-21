interface DependencyServiceInterface {
  list(id: string): Promise<any>;
  create(id: string, dependsOnId: string): Promise<string>;
  delete(id: string, dependsOnId: string): Promise<void>;
}

export default DependencyServiceInterface;
