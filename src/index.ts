import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
