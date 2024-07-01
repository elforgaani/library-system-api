import { NextFunction, Request, Response } from "express";
import Book from "../../database/models/book.model";
import Author from "../../database/models/author.model";
import { pagination } from "../../utils/pagination.utils";
import { Meta } from "../../types/meta";
import { isHex } from "../../utils/schemas.utils";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { book }: { book: any } = req;
  const author = await Author.findById(book.author);
  console.log(author);

  if (!author) {
    return res
      .status(400)
      .json({ success: false, message: "Author Does not Exist" });
  }
  const result = await Book.create(book);
  console.log(result);
  res.status(201).json({
    success: true,
    message: "Book Added Successfully.",
    data: result,
  });
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { page = 1, limit = 6 } = req.query;
  const pageNumber = Math.max(Number(page), 1);  // Ensure page is at least 1
  const limitResults = Math.max(Number(limit), 1);

  const count = await Book.countDocuments();
  const meta: Meta = {
    page: pageNumber,
    pages: Math.ceil(count / limitResults),
  };
  const books = await Book.find(
    {},
    { __v: 0 },
    pagination(pageNumber, limitResults)
  ).populate([{ path: "author", select: "_id name " }]);
  res.status(200).json({ success: true, meta, date: books });

};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const isValidId: boolean = isHex(id);
  if (!isValidId) {
    return res
      .status(400)
      .json({ success: false, message: "Book id is not valid" });
  }
  const book = await Book.findById(id).populate([
    { path: "author", select: "_id name" },
  ]);
  res.status(200).json({ success: true, data: book });

};


export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content, author: authorId, publishedDate } = req.body;
  const isVaildId = isHex(id);
  if (!isVaildId) {
    return res.status(400).json({ success: false, message: "Book id is not valid" });
  }
  const author = await Author.findById(authorId);
  if (!author) {
    return res.status(404).json({ success: false, message: "Author Does not Exist" });
  }
  const book = await Book.findByIdAndUpdate(id, { title, content, author: authorId, publishedDate }, { new: true }).populate([{ path: "author", select: "name" }]);
  if (!book) {
    return res.status(400).json({ success: false, message: "Book Does not Exist" });
  }
  res.status(200).json({ success: true, message: "Book Updated Successfully", data: book });

}


export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isValidId = isHex(id);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Book id is not valid" });
  }
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book is Not Exist" });
  }
  res.status(200).json({ success: true, message: "Book Deleted Successfully" });

}