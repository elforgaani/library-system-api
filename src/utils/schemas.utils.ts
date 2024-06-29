import * as yup from "yup";

const hexDecOnlyRegExp = /^[0-9A-Fa-f]+$/;

export const addBookRequestBodyValidationSchema = yup.object({
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

export const addAuthorRequestBodyValidationSchema = yup.object({
  name: yup.string().required(),
  bio: yup.string(),
  birthDate: yup.string().datetime(),
  books: yup
    .array(yup.string().matches(hexDecOnlyRegExp).nullable())
    .nullable(),
});
