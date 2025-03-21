class DeleteTaskFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeleteTaskFailedException";
  }
}

export default DeleteTaskFailedException;
