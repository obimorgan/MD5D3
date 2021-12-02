import fs from "fs-extra"
import path from "path"
import {fileURLToPath} from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors")

const authorsJsonPath = join(dataFolderPath, "authors.json")
const blogsJsonPath = join(dataFolderPath, "blogs.json")

export const getBlogs = () => readJSON(blogsJsonPath)
export const getAuthors = () => readJSON(authorsJsonPath)