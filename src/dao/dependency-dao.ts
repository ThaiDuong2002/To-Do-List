import { ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";

class DependencyDao {
  public async create(id: string, dependsOnId: string): Promise<string | null> {
    try {
      const dependencyId = uuidv4();

      const [result] = await db().query<ResultSetHeader>(
        `INSERT INTO Dependencies (DependencyId, TaskId, DependsOnTaskId) VALUES (?, ?, ?)`,
        [dependencyId, id, dependsOnId]
      );

      if (result.affectedRows === 0) {
        return null;
      } else {
        return dependencyId;
      }
    } catch (error) {
      throw new Error(`Error creating dependency: ${error}`);
    }
  }

  public async delete(id: string, dependsOnId: string): Promise<number> {
    try {
      const [result] = await db().query<ResultSetHeader>(
        `DELETE FROM Dependencies WHERE TaskId = ? AND DependsOnTaskId = ?`,
        [id, dependsOnId]
      );

      return result.affectedRows;
    } catch (error) {
      throw new Error(`Error deleting dependency: ${error}`);
    }
  }

  public async list(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default new DependencyDao();
