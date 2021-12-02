import { body } from "express-validator"

export const authorsValidation =[
    body("name").exists().withMessage("Name is required"),
    body("surname").exists().withMessage("Surname is required"),
    // body("title").exists().withMessage("title is required")
]
