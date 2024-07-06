"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const schema = new Schema({
    name: {
        type: String,
        requird: true,
    },
    bio: String,
    birthDate: Date,
    books: {
        type: [Schema.Types.ObjectId],
        ref: "Book",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Author || model("Author", schema);
