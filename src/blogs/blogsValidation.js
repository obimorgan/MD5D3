import { body } from "express-validator"

export const blogsValidation =[
    body("title").exists().withMessage("Title is required"),
    body("content").exists().withMessage("New content is required"),
    body("category").exists().withMessage("Need to add a category")
]
