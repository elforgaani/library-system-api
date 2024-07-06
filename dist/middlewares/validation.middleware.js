"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.addAuthorRequestInputValidationMiddleware = exports.addBookRequestInputValidationMiddelware = void 0;
const schemas_utils_1 = require("../utils/schemas.utils");
const addBookRequestInputValidationMiddelware = (req, res, next) => {
    const { title, content, author, publishedDate } = req.body;
    const book = { title, content, author, publishedDate };
    try {
        schemas_utils_1.addBookRequestBodyValidationSchema.validateSync(book);
        req.book = book;
        next();
    }
    catch (error) {
        const { errors } = error;
        res.status(400).json({
            success: false,
            message: "Error While Parsing Body",
            errors: errors || "",
        });
    }
};
exports.addBookRequestInputValidationMiddelware = addBookRequestInputValidationMiddelware;
const addAuthorRequestInputValidationMiddleware = (req, res, next) => {
    const { name, bio, birthDate, books } = req.body;
    const author = { name, bio, birthDate, books };
    console.log(author);
    try {
        schemas_utils_1.addAuthorRequestBodyValidationSchema.validateSync(author);
        req.author = author;
        next();
    }
    catch (error) {
        const { errors } = error;
        res.status(400).json({
            success: false,
            message: "Error While Parsing Body",
            errors: errors || "",
        });
    }
};
exports.addAuthorRequestInputValidationMiddleware = addAuthorRequestInputValidationMiddleware;
const validationMiddleware = (validationSchema) => {
    return (req, res, next) => {
        try {
            validationSchema.validateSync(req.body);
            next();
        }
        catch (error) {
            const { errors } = error;
            res.status(400).json({ success: false, message: "Error While Parsing Body", errors: errors || '' });
        }
    };
};
exports.validationMiddleware = validationMiddleware;
