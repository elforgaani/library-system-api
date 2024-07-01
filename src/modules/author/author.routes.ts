import { Router } from "express";
import * as AuthorController from "./author.controller";
import { addAuthorRequestInputValidationMiddleware, validationMiddleware } from "../../middlewares/validation.middleware";
import { errorHandleMiddleware } from "../../middlewares/error-handler.middleware";
import { addBookRequestBodyValidationSchema } from "../../utils/schemas.utils";
const router = Router();

router.post("/", validationMiddleware(addBookRequestBodyValidationSchema), errorHandleMiddleware(AuthorController.addAuthor));
router.get('/', errorHandleMiddleware(AuthorController.getAllAuthors));
router.get('/:id', errorHandleMiddleware(AuthorController.getAuthorById));
router.put('/:id', errorHandleMiddleware(AuthorController.updateAuthor));
router.delete("/:id", errorHandleMiddleware(AuthorController.deleteAuthor));

export default router;
