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
exports.filterAuthors = exports.deleteAuthor = exports.updateAuthor = exports.getAuthorById = exports.getAllAuthors = exports.addAuthor = void 0;
const author_model_1 = __importDefault(require("../../database/models/author.model"));
const schemas_utils_1 = require("../../utils/schemas.utils");
const pagination_utils_1 = require("../../utils/pagination.utils");
const addAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, birthDate, books } = req.body;
    const author = { name, bio, birthDate, books };
    const result = yield author_model_1.default.create(author);
    res.status(201).json({ success: true, message: "Author Added Successfully", data: result });
});
exports.addAuthor = addAuthor;
const getAllAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { page = 1, limit = 6 } = req.query;
    const pageNumber = Math.max(Number(page), 1);
    const limitResults = Math.max(Number(limit), 1);
    const count = yield author_model_1.default.countDocuments();
    const meta = {
        page: pageNumber,
        pages: Math.ceil(count / limitResults)
    };
    const authors = yield author_model_1.default.find({}, { __v: 0 }, (0, pagination_utils_1.pagination)(pageNumber, limitResults)).populate([{ path: "books", select: "_id title content" }]);
    res.status(200).json({ success: true, meta, data: authors });
});
exports.getAllAuthors = getAllAuthors;
const getAuthorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isValidId = (0, schemas_utils_1.isHex)(id);
    if (!isValidId) {
        return res.status(400).json({ success: false, message: "Author id is not Valid" });
    }
    const author = yield author_model_1.default.findById(id, { __v: 0 });
    res.status(200).json({ success: true, date: author });
});
exports.getAuthorById = getAuthorById;
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, birthDate, books } = req.body;
    const isValidId = (0, schemas_utils_1.isHex)(id);
    if (!isValidId) {
        return res.status(400).json({ success: false, message: "Author id is Invalid" });
    }
    const result = yield author_model_1.default.findByIdAndUpdate(id, { name, bio, birthDate, books }, { new: true });
    res.status(200).json({ success: true, message: "Author Updated Successfully", data: result });
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isValidId = (0, schemas_utils_1.isHex)(id);
    if (!isValidId) {
        return res.status(400).json({ success: false, message: "Author id is not valid" });
    }
    const result = yield author_model_1.default.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).json({ success: false, message: "Author Does not Exist" });
    }
    res.status(200).json({ success: true, message: "Author Deleted Successfully" });
});
exports.deleteAuthor = deleteAuthor;
const filterAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio } = req.query;
    const authors = yield author_model_1.default.find({ name, bio });
    res.status(200).json({ success: true, data: authors });
});
exports.filterAuthors = filterAuthors;
