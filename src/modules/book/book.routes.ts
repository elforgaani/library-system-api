import { Router } from "express";
import * as BookController from "./book.controller";
import { addBookRequestInputValidationMiddelware, validationMiddleware } from "../../middlewares/validation.middleware";
import { errorHandleMiddleware } from "../../middlewares/error-handler.middleware";
import { addBookRequestBodyValidationSchema } from "../../utils/schemas.utils";
const router = Router();

router.post(
  "/",
  // addBookRequestInputValidationMiddelware,
  validationMiddleware(addBookRequestBodyValidationSchema),
  BookController.addBook
);
router.get("/", errorHandleMiddleware(BookController.getAllBooks));
router.get("/:id", errorHandleMiddleware(BookController.getBookById));
router.put('/:id', errorHandleMiddleware(BookController.updateBook));
router.delete(':/id', errorHandleMiddleware(BookController.deleteBook))

export default router;
