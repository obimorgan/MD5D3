/** @format */

import express from "express";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { authorsValidation } from "./authorsValidation.js";
import { getAuthors, writeAuthors } from "../lib/fs-tools.js";

const authorsRouter = express.Router();

// const authorsJSONPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "authors.json"
// );

// const getauthors = () => JSON.parse(fs.readFileSync(authorsJSONPath));
// const writeauthors = (content) =>
//   fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

//Post a new author
authorsRouter.post("/", authorsValidation, async (req, res, next) => {
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
      const authors = await getAuthors();

      authors.push(newAuthor);
      await writeAuthors(authors);
      res.status(201).send({ id: newAuthor.id, newAuthor });
    }
  } catch (error) {
    next(error);
  }
});

// get authors
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    console.log(authors)
    console.log("authors")
    res.send({ authors });
  } catch (error) {
    next(error);
  }
});

//get an author by id
authorsRouter.get("/:authorId", async(req, res, next) => {
  try {
    const author = await getAuthors();
    const getAuthorById = author.find((a) => a.id === req.params.authorId);
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

// delete author
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter((a) => a.id !== req.params.authorId);
    await writeAuthors(remainingAuthors);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// edit blog
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const index = authors.findIndex((a) => a.id === req.params.authorId);
    const authorToEdit = authors[index];
    const editedFields = req.body;

    const editedAuthor = { ...authorToEdit, editedFields, updated: new Date() };
    authors[index] = editedAuthor;
    await writeAuthors(authors);

    res.send(editedAuthor);
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
