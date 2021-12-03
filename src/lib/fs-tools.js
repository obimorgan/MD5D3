import fs from "fs-extra"
import {fileURLToPath} from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs
// "writefile" for creating ie.images

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
console.log("fs-tools", dataFolderPath)

export const authorsPublicFolderPath = join(process.cwd(), "./public")
//Joining the folder path with the public-img-folder


const authorsJsonPath = join(dataFolderPath, "authors.json")
console.log(authorsJsonPath)

const blogsJsonPath = join(dataFolderPath, "blogs.json")
console.log(blogsJsonPath)

export const getBlogs = () => readJSON(blogsJsonPath)
export const writeBlogs = () => content => writeJSON(blogsJsonPath, content)
export const getAuthors = () => readJSON(authorsJsonPath)
export const writeAuthors = () => content => writeJSON(authorsJsonPath, content)

//the first parameter can be any files chosen 
export const saveAuthorsAvatar = (fileName, contentAsABuffer) => writeFile(join(authorsPublicFolderPath, fileName), contentAsABuffer)
console.log(saveAuthorsAvatar)
console.log("test", authorsPublicFolderPath)


// This is now redundent because the methods are (synchronous), using fs.extra(is asyncrhonous)
// export const getBlogs = () => JSON.parse(fs.readFileSync(blogsJsonPath))
// export const writeBlogs = content => fs.writeFileSync(blogsJsonPath, JSON.stringify(content))

// console.log(process.cwd())
// gives the root file 