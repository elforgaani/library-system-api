import { Router } from "express";
import * as AuthorController from "./author.controller";
const router = Router();

router.post("/", AuthorController.addAuthor);

export default router;
