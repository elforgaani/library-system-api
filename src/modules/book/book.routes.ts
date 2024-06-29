import { Router } from "express";
import * as BookController from "./book.controller";
import { addBookRequestInputValidationMiddelware } from "../../middlewares/validation.middleware";
const router = Router();

router.post(
  "/",
  addBookRequestInputValidationMiddelware,
  BookController.addBook
);
router.get("/", BookController.getAllBooks);
export default router;
