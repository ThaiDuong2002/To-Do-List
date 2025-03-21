class CreateDependencyFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateDependencyFailedException";
  }
}

export default CreateDependencyFailedException;
