/** @format */

import express from "express";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { authorsValidation } from "./authorsValidation.js";

const authorsRouter = express.Router();

// const authorsJSONPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "authors.json"
// );

// const getauthors = () => JSON.parse(fs.readFileSync(authorsJSONPath));
// const writeauthors = (content) =>
//   fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

//Post a blog
authorsRouter.post("/", authorsValidation, (req, res, next) => {
  try {
    const errorsList = validationResult(req);

    if (!errorsList.isEmpty()) {
      next(
        createHttpError(400, "Error occured in the request body", {
          errorsList,
        })
      );
    } else {
      const newAuthor = { ...req.body, ceatedAt: new Date(), id: uniqid() };
      const authors = getAuthors();

      authors.push(newAuthor);
      writeAuthors(authors);
      res.status(201).send({ id: newAuthor.id, newAuthor });
    }
  } catch (error) {
    next(error);
  }
});

// get blogs
authorsRouter.get("/", (req, res, next) => {
  try {
    const authors = getAuthors();
    res.send({ authors });
  } catch (error) {
    next(error);
  }
});

//get a blog by id
authorsRouter.get("/:authorId", (req, res, next) => {
  try {
    const author = getAuthors();
    const getAuthorById = author.find((b) => b.id === req.params.authorId);
    if (getAuthorById) {
      res.send(getAuthorById);
    } else {
      next(
        createHttpError(
          404,
          `Error has occured in getting the blog with this ID: ${req.params.authorId}`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// delete blog
authorsRouter.delete("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthors();
    const remainingAuthors = authors.filter((b) => b.id !== req.params.authorId);
    writeauthors(remainingAuthors);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// edit blog
authorsRouter.put("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthors();
    const index = authors.findIndex((b) => b.id === req.params.authorId);
    const blogToEdit = authors[index];
    const editedFields = req.body;

    const editedBlog = { ...blogToEdit, editedFields, updated: new Date() };
    authors[index] = editedBlog;
    writeauthors(authors);

    res.send(editedBlog);
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
