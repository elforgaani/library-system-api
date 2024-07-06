"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHex = exports.addAuthorRequestBodyValidationSchema = exports.addBookRequestBodyValidationSchema = void 0;
const yup = __importStar(require("yup"));
const hexDecOnlyRegExp = /^[0-9A-Fa-f]+$/;
exports.addBookRequestBodyValidationSchema = yup.object({
    title: yup.string().required().min(3).max(50),
    content: yup.string().min(3).max(100),
    author: yup
        .string()
        .required()
        .matches(/^[0-9A-Fa-f]+$/)
        .min(24)
        .max(24),
    publishedDate: yup.date().required(),
});
exports.addAuthorRequestBodyValidationSchema = yup.object({
    name: yup.string().required(),
    bio: yup.string(),
    birthDate: yup.string().datetime(),
    books: yup
        .array(yup.string().matches(hexDecOnlyRegExp).nullable())
        .nullable(),
});
const isHex = (value) => {
    var _a;
    const hexDecOnlyRegEx = /^[0-9A-Fa-f]+$/;
    return (_a = hexDecOnlyRegEx.test(value)) !== null && _a !== void 0 ? _a : false;
};
exports.isHex = isHex;
