const ERROR_MESSAGES = {
  DATABASE_ERROR: "Something went wrong with the database.",
  TASK_CREATION_FAILED: "Task creation failed.",
  TASK_NOT_FOUND: (id: string) => `Task with id ${id} not found.`,
  TASK_UPDATE_FAILED: "Task update failed.",
  TASK_DELETION_FAILED: "Task deletion failed.",
  TASK_ALREADY_EXISTS: "Task already exists.",
  CIRCULAR_DEPENDENCY: "Circular dependency detected.",
  CREATE_DEPENDENCY_FAILED: "Task dependency creation failed.",
  DELETE_DEPENDENCY_FAILED: "Task dependency deletion failed.",
  INTERNAL_SERVER_ERROR: "Something went wrong! Please try again later.",
};

export default ERROR_MESSAGES;
