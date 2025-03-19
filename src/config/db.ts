import dotenv from "dotenv";
import mysql2 from "mysql2/promise";
import { DB_CONSTANTS } from "../constants";

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  connectionLimit: 10,
});

const DB = async () => {
  try {
    const connection = await pool.getConnection();

    return connection;
  } catch (error) {
    console.log(DB_CONSTANTS.CONNECT_DB_ERROR);
  }
};

export default DB;
