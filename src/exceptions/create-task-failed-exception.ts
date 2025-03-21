class CreateTaskFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateTaskFailedException";
  }
}

export default CreateTaskFailedException;
