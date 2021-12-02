import { body } from "express-validator"

export const authorsValidation =[
    body("title").exists().withMessage("Title is required"),
]
