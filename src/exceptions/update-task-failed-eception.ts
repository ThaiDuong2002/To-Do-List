class UpdateTaskFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UpdateTaskFailedException";
  }
}

export default UpdateTaskFailedException;
