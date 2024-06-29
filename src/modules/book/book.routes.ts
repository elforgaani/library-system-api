import { Router } from "express";
import * as BookController from "./book.controller";
import { addBookRequestInputValidationMiddelware } from "../../middlewares/validation.middleware";
const router = Router();

router.post(
  "/",
  addBookRequestInputValidationMiddelware,
  BookController.addBook
);

export default router;
