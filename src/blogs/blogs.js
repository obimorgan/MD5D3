import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const blogsRouter = express.Router()

const blogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogs.json")

const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath))
const writeBlogs = content => fs.writeFileSync(blogsJSONPath, JSON.stringify(content)) 

//Post a blog
blogsRouter.post("/", (req, res, next) => {
    try {
        const newBlog = { ...req.body, ceatedAt: new Date(), id: uniqid()}
        const blog = getBlogs()

        blog.push(newBlog)
        writeBlogs(blog)
        res.status(201).send({id: newBlog.id})
    } catch (error) {
        next(error)
    }
})

// get blogs
blogsRouter.get("/", (req, res, next) => {
    try {
        const blog = getBlogs()

        res.send({blog})
    } catch (error) {
        next(error)
    }
})

//get a blog by id
blogsRouter.get("/:blogId", (req, res, next) => {
    try {
        const blog = getBlogs()
        const getBlogById = blog.find(b => b.id === req.params.blogId)
        res.send(getBlogById)
    } catch (error) {
        next(error)
    }
})

// delete blog
blogsRouter.delete("/:blogId", (req, res, next) => {
    try {
        const blogs = getBlogs()
        const remainingBlogs = blogs.filter(b => b.id !== req.params.blogId)
        writeBlogs(remainingBlogs)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

// edit blog
blogsRouter.put("/:blogId", (req, res, next) => {
    try {
        const blogs = getBlogs()
        const index = blogs.findIndex(b => b.id === req.params.blogId)
        const blogToEdit = blogs[index]
        const editedFields = req.body

        const editedBlog = { ...blogToEdit, editedFields, updated: new Date() }
        blogs[index] = editedBlog
        writeBlogs(blogs)

        res.send(editedBlog)
    } catch (error) {
        next(error)
    }
})



export default blogsRouter