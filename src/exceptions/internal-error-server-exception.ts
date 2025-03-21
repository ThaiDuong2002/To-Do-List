class InternalErrorServerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalErrorServerException";
  }
}

export default InternalErrorServerException;
