import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { databaseConnection } from "./config";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, async () => {
  try {
    await databaseConnection.pool();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Database connection error:", error);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
