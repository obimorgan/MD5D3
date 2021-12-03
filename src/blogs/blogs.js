/** @format */

import express from "express";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { blogsValidation } from "./blogsValidation.js";
import { getBlogs, writeBlogs } from "../lib/fs-tools.js";

const blogsRouter = express.Router();

// const blogsJSONPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "blogs.json"
// );

// const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath));
// const writeBlogs = (content) =>
//   fs.writeFileSync(blogsJSONPath, JSON.stringify(content));

//Post a blog
blogsRouter.post("/", blogsValidation, async (req, res, next) => {
  try {
    const errorsList = validationResult(req);

    if (!errorsList.isEmpty()) {
      next(
        createHttpError(400, "Error occured in the request body", {
          errorsList,
        })
      );
    } else {
      const newBlog = { ...req.body, ceatedAt: new Date(), id: uniqid() };
      const blogs = await getBlogs();

      blogs.push(newBlog);
      await writeBlogs(blogs);
      res.status(201).send({ id: newBlog.id, newBlog });
    }
  } catch (error) {
    next(error);
  }
});

// get blogs
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await getBlogs();
    res.send({ blogs });
  } catch (error) {
    next(error);
  }
});

//get a blog by id
blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blog = await getBlogs();
    const getBlogById = blog.find((b) => b.id === req.params.blogId);
    if (getBlogById) {
      res.send(getBlogById);
    } else {
      next(
        createHttpError(
          404,
          `Error has occured in getting the blog with this ID: ${req.params.blogId}`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// delete blog
blogsRouter.delete("/:blogId", async(req, res, next) => {
  try {
    const blogs = await getBlogs();
    const remainingBlogs = blogs.filter((b) => b.id !== req.params.blogId);
    await writeBlogs(remainingBlogs);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// edit blog
blogsRouter.put("/:blogId", async(req, res, next) => {
  try {
    const blogs = await getBlogs();
    const index = blogs.findIndex((b) => b.id === req.params.blogId);
    const blogToEdit = blogs[index];
    // const editedFields = req.body;

    const editedBlog = { ...blogToEdit, updated: new Date() };
    blogs[index] = editedBlog;
    await writeBlogs(blogs);

    res.send(editedBlog);
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
