import fs from "fs-extra"
import {fileURLToPath} from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors")
//Joining the folder path with the folder(json folders)
const authorsJsonPath = join(dataFolderPath, "authors.json")
// console.log(authorsJsonPath)
const blogsJsonPath = join(dataFolderPath, "blogs.json")
// console.log(blogsJsonPath)

export const getBlogs = () => readJSON(blogsJsonPath)
export const writeBlogs = () => content => writeJSON(blogsJsonPath, content)
export const getAuthors = () => readJSON(authorsJsonPath)
export const writeAuthors = () => content => writeJSON(authorsJsonPath, content)
export const saveUsersAvatar = (fileName, contentAsABuffer) => writeFile(join(authorsPublicFolderPath, fileName), contentAsABuffer)

// This is now redundent because the methods are (synchronous), using fs.extra(is asyncrhonous)
// export const getBlogs = () => JSON.parse(fs.readFileSync(blogsJsonPath))
// export const writeBlogs = content => fs.writeFileSync(blogsJsonPath, JSON.stringify(content))