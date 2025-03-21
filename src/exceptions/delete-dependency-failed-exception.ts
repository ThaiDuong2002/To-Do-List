class DeleteDependencyFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeleteDependencyFailedException";
  }
}

export default DeleteDependencyFailedException;
