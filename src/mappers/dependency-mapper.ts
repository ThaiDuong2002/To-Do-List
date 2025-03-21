import { DependencyDto } from "../dto";

class DependencyMapper {
  static toDto(dependency: any): DependencyDto {
    return {
      taskId: dependency.TaskID,
      dependsOnTaskId: dependency.DependsOnTaskID,
    };
  }
}

export default DependencyMapper;
