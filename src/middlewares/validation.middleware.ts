import { NextFunction, Request, RequestHandler, Response } from "express";
import { addAuthorRequestBodyValidationSchema, addBookRequestBodyValidationSchema } from "../utils/schemas.utils";
import * as yup from 'yup';
export const addBookRequestInputValidationMiddelware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, author, publishedDate } = req.body;
  const book = { title, content, author, publishedDate };
  try {

    addBookRequestBodyValidationSchema.validateSync(book);
    req.book = book;
    next();
  } catch (error: any) {
    const { errors } = error;
    res.status(400).json({
      success: false,
      message: "Error While Parsing Body",
      errors: errors || "",
    });
  }
};

export const addAuthorRequestInputValidationMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { name, bio, birthDate, books } = req.body;

  const author = { name, bio, birthDate, books };
  console.log(author);

  try {
    addAuthorRequestBodyValidationSchema.validateSync(author)
    req.author = author
    next()
  } catch (error: any) {
    const { errors } = error;
    res.status(400).json({
      success: false,
      message: "Error While Parsing Body",
      errors: errors || "",
    });
  }
}

export const validationMiddleware = (validationSchema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validationSchema.validateSync(req.body);
      next()
    } catch (error: any) {
      const { errors } = error;
      res.status(400).json({ success: false, message: "Error While Parsing Body", errors: errors || '' });
    }
  }
}