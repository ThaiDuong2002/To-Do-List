class DatabaseErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseErrorException";
  }
}

export default DatabaseErrorException;
