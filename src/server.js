import express from "express"
import listEndpoints from "express-list-endpoints"
// import cors from "cors"

const server = express()
const port = 3002

// server.use(cors())
server.use(express.json())
// server.use("/", blogsRouter)

console.log(listEndpoints(server))

server.listen(port, () => console.log("Server is running on:", port))
