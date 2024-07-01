import { Router } from "express";
import * as AuthorController from "./author.controller";
import { addAuthorRequestInputValidationMiddleware } from "../../middlewares/validation.middleware";
import { errorHandleMiddleware } from "../../utils/error-handler.middleware";
const router = Router();

router.post("/", addAuthorRequestInputValidationMiddleware, errorHandleMiddleware(AuthorController.addAuthor));
router.get('/', errorHandleMiddleware(AuthorController.getAllAuthors));
router.get('/:id', errorHandleMiddleware(AuthorController.getAuthorById));
router.put('/:id', errorHandleMiddleware(AuthorController.updateAuthor));
router.delete("/:id", errorHandleMiddleware(AuthorController.deleteAuthor));

export default router;
