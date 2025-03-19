import { Express } from "express";
import taskRouter from "./task-route";

const routes = (app: Express) => {
  app.use(taskRouter);
};

export default routes;
