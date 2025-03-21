import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";
import { ERROR_MESSAGES } from "../constants";
import { DependencyDto } from "../dto";
import { DatabaseErrorException } from "../exceptions";
import { DependencyMapper } from "../mappers";

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
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
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
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  public async list(id: string): Promise<DependencyDto[]> {
    try {
      const query = `
        WITH RECURSIVE DependencyTree AS (
            SELECT TaskID, DependsOnTaskID
            FROM Dependencies
            WHERE TaskID = ?
            UNION
            SELECT td.TaskID, td.DependsOnTaskID
            FROM Dependencies td
            INNER JOIN DependencyTree dt ON td.TaskID = dt.DependsOnTaskID
        )
        SELECT * FROM DependencyTree;
      `;
      const [results] = await db().query<RowDataPacket[]>(query, [id]);

      return results.map((row) => DependencyMapper.toDto(row));
    } catch (error) {
      throw new DatabaseErrorException(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }
}

export default new DependencyDao();
