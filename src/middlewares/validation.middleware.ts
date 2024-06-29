import { NextFunction, Request, RequestHandler, Response } from "express";
import { addBookRequestBodyValidationSchema } from "../utils/schemas.utils";

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
