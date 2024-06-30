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
router.get("/:id", BookController.getBookById);
router.put('/:id', BookController.updateBook);
router.delete(':/id', BookController.deleteBook)

export default router;
