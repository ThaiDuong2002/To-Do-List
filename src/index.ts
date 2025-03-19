import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { DB } from "./config";
import { SERVER_CONSTANTS } from "./constants";
import { errorHelper } from "./helpers";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

// Error handling middleware
app.use(errorHelper.notFound);
app.use(errorHelper.errorHandler);

app.listen(port, async () => {
  await DB();
  console.log(`${SERVER_CONSTANTS.SERVER_START_SUCCESS}${port}`);
});
