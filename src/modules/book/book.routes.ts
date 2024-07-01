import { Router } from "express";
import * as BookController from "./book.controller";
import { addBookRequestInputValidationMiddelware } from "../../middlewares/validation.middleware";
import { errorHandleMiddleware } from "../../utils/error-handler.middleware";
const router = Router();

router.post(
  "/",
  addBookRequestInputValidationMiddelware,
  BookController.addBook
);
router.get("/", errorHandleMiddleware(BookController.getAllBooks));
router.get("/:id", errorHandleMiddleware(BookController.getBookById));
router.put('/:id', errorHandleMiddleware(BookController.updateBook));
router.delete(':/id', errorHandleMiddleware(BookController.deleteBook))

export default router;
