import dotenv from "dotenv";
import mysql2 from "mysql2/promise";

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  connectionLimit: 10,
});

const databaseConnection = {
  pool: async () => {
    try {
      const connection = await pool.getConnection();

      return connection;
    } catch (error) {
      throw new Error("Failed to connect to the database.");
    }
  },
};

export default databaseConnection;
