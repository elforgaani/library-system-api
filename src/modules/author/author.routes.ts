import { Router } from "express";
import * as AuthorController from "./author.controller";
import { addAuthorRequestInputValidationMiddleware } from "../../middlewares/validation.middleware";
const router = Router();

router.post("/", addAuthorRequestInputValidationMiddleware, AuthorController.addAuthor);
router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById);
router.put('/:id', AuthorController.updateAuthor);

export default router;
