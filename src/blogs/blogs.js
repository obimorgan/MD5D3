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
// blogsRouter.get("/:id", (req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// })


export default blogsRouter