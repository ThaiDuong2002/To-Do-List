import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  connectionLimit: 10,
});

const connection = () => {
  pool.getConnection((error) => {
    if (error) {
      console.error("Database connection failed: ", error);
    } else {
      console.log("Database connection successful");
    }
  });
};

const db = () => pool.promise();

export { connection, db };
