"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const connection_1 = __importDefault(require("./database/connection"));
const book_routes_1 = __importDefault(require("./modules/book/book.routes"));
const author_routes_1 = __importDefault(require("./modules/author/author.routes"));
const global_error_middleware_1 = require("./middlewares/global-error.middleware");
function main() {
    const port = Number(process.env.PORT);
    const app = (0, express_1.default)();
    (0, connection_1.default)();
    app.use(express_1.default.json());
    app.use("/api/v1/books", book_routes_1.default);
    app.use("/api/v1/authors", author_routes_1.default);
    app.use(global_error_middleware_1.globalErrorMiddlewareHnadler);
    app.listen(port, () => console.log("Server Connected Successfully"));
}
