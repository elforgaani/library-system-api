import { NextFunction, Request, Response } from "express";
import Book from "../../database/models/book.model";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const book = await Book.create()
    res
      .status(201)
      .json({ success: true, message: "Book Added Successfully." });
  } catch (error) {}
};
