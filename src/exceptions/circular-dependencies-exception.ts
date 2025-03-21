class CircularDependenciesException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircularDependenciesException";
  }
}

export default CircularDependenciesException;
