import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

import authorsRouter from "./authors/authors.js"
import blogsRouter from "./blogs/blogs.js"
import filesRouter from "./files/files.js"

import { badReQuestHandler, unAuthorizedHandler, notFoundHandler, genericErrorHandler} from "./errorHandling/index.js"
import { join } from "path"


const server = express()
const port = 3002

const publicFolderPath = join(process.cwd(), "./public")
// joinin the root file with pubic
console.log("console.log/inside server.js", publicFolderPath)
server.use(express.static(publicFolderPath))

server.use(cors())
server.use(express.json())

server.use("/authors", authorsRouter)
server.use("/blogs", blogsRouter)
server.use("/files", filesRouter)



server.use(badReQuestHandler)
server.use(unAuthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

// console.table(listEndpoints(server))
server.listen(port, () => console.log("Server is running on:", port))
