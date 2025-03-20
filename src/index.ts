import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { DB } from "./config";
import { SERVER_CONSTANTS } from "./constants";
import { ErrorHelper } from "./helpers";
import TaskRoutes from "./routes";
import CommonRoutes from "./routes/common-route";

dotenv.config();

const app: express.Application = express();
const routes: Array<CommonRoutes> = [];
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.push(new TaskRoutes(app));

app.listen(port, async () => {
  await DB();
  console.log(`${SERVER_CONSTANTS.SERVER_START_SUCCESS}${port}`);

  routes.forEach((route: CommonRoutes) => {
    route.configureRoutes();
  });

  // Error handling middleware
  app.use(ErrorHelper.notFound);
  app.use(ErrorHelper.errorHandler);
});
