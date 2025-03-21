class TaskAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskAlreadyExistsException";
  }
}

export default TaskAlreadyExistsException;
