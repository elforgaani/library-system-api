"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (page, limit) => {
    return { limit: limit, skip: (page - 1) * limit };
};
exports.pagination = pagination;
