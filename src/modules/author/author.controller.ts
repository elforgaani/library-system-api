import { NextFunction, Request, Response } from "express";
import Author from "../../database/models/author.model";
import { isHex } from "../../utils/schemas.utils";
import { Meta } from "../../types/meta";
import { pagination } from "../../utils/pagination.utils";

export const addAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { author } = req;
  try {
    const result = await Author.create(author);
    res.status(201).json({ success: true, message: "Author Added Successfully", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
};

export const getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
  let { page = 1, limit = 6 } = req.query;
  const pageNumber = Math.max(Number(page), 1);
  const limitResults = Math.max(Number(limit), 1);
  try {
    const count = await Author.countDocuments();
    const meta: Meta = {
      page: pageNumber,
      pages: Math.ceil(count / limitResults)
    }
    const authors = await Author.find({}, { __v: 0 }, pagination(pageNumber, limitResults)).populate([{ path: "books", select: "_id title content" }])
    res.status(200).json({ success: true, meta, data: authors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}

export const getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const isValidId = isHex(id);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Author id is not Valid" });
  }
  try {
    const author = await Author.findById(id, { __v: 0 });
    res.status(200).json({ success: true, date: author });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Sever Error" });
  }
}
