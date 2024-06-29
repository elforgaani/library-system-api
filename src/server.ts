import express, { Request, Response } from "express";
import "dotenv/config";
import dbConnection from "./database/connection";
import BooksRouter from "./modules/book/book.routes";
import AuthorsRouter from "./modules/author/author.routes";
export default function main() {
  const port = Number(process.env.PORT);
  const app = express();
  dbConnection();

  app.use(express.json());
  app.use("/api/v1/books", BooksRouter);
  app.use("/api/v1/authors", AuthorsRouter);

  app.listen(port, () => console.log("Server Connected Successfully"));
}
