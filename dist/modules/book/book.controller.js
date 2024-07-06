"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBooks = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.addBook = void 0;
const book_model_1 = __importDefault(require("../../database/models/book.model"));
const author_model_1 = __importDefault(require("../../database/models/author.model"));
const pagination_utils_1 = require("../../utils/pagination.utils");
const schemas_utils_1 = require("../../utils/schemas.utils");
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { book }: { book: any } = req;
    const { title, content, author: authorId, publishedDate } = req.body;
    const book = { title, content, author: authorId, publishedDate };
    const author = yield author_model_1.default.findById(authorId);
    console.log(author);
    if (!author) {
        return res
            .status(400)
            .json({ success: false, message: "Author Does not Exist" });
    }
    const result = yield book_model_1.default.create(book);
    console.log(result);
    res.status(201).json({
        success: true,
        message: "Book Added Successfully.",
        data: result,
    });
});
exports.addBook = addBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { page = 1, limit = 6 } = req.query;
    const pageNumber = Math.max(Number(page), 1);
    const limitResults = Math.max(Number(limit), 1);
    const count = yield book_model_1.default.countDocuments();
    const meta = {
        page: pageNumber,
        pages: Math.ceil(count / limitResults),
    };
    const books = yield book_model_1.default.find({}, { __v: 0 }, (0, pagination_utils_1.pagination)(pageNumber, limitResults)).populate([{ path: "author", select: "_id name " }]);
    res.status(200).json({ success: true, meta, date: books });
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isValidId = (0, schemas_utils_1.isHex)(id);
    if (!isValidId) {
        return res
            .status(400)
            .json({ success: false, message: "Book id is not valid" });
    }
    const book = yield book_model_1.default.findById(id).populate([
        { path: "author", select: "_id name" },
    ]);
    res.status(200).json({ success: true, data: book });
});
exports.getBookById = getBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, author: authorId, publishedDate } = req.body;
    const isVaildId = (0, schemas_utils_1.isHex)(id);
    if (!isVaildId) {
        return res.status(400).json({ success: false, message: "Book id is not valid" });
    }
    const author = yield author_model_1.default.findById(authorId);
    if (!author) {
        return res.status(404).json({ success: false, message: "Author Does not Exist" });
    }
    const book = yield book_model_1.default.findByIdAndUpdate(id, { title, content, author: authorId, publishedDate }, { new: true }).populate([{ path: "author", select: "name" }]);
    if (!book) {
        return res.status(400).json({ success: false, message: "Book Does not Exist" });
    }
    res.status(200).json({ success: true, message: "Book Updated Successfully", data: book });
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isValidId = (0, schemas_utils_1.isHex)(id);
    if (!isValidId) {
        return res.status(400).json({ success: false, message: "Book id is not valid" });
    }
    const book = yield book_model_1.default.findByIdAndDelete(id);
    if (!book) {
        return res.status(404).json({ success: false, message: "Book is Not Exist" });
    }
    res.status(200).json({ success: true, message: "Book Deleted Successfully" });
});
exports.deleteBook = deleteBook;
const filterBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, title } = req.query;
    const books = yield book_model_1.default.find({ title, author });
    res.status(200).json({ success: true, data: books });
});
exports.filterBooks = filterBooks;
