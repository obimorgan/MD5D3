import express from "express"
import multer from "multer"
// import createHttpError from "http-errors"
import { saveAuthorsAvatar } from "../lib/fs-tools.js"


const filesRouter = express.Router()

filesRouter.post("/uploadImg", multer().single("avatarPic"), async (req, res, next) => {
    try {
        console.log("FIle:", req.file)
        await saveAuthorsAvatar(req.file.originalname, req.file.buffer)
        // first parameter is the files name, second is the content
        res.send("ok")
    } catch (error) {
        next(error)
    }
})

filesRouter.post("/uploadMultiple", multer().array("profilePics"), async(req, res, next) => {
    try {
        console.log("FIle:", req.file)
        const arrayOfPromises = req.files.map(file => saveAuthorsAvatar(file.originalname, req.file.buffer))
        await Promise.all(arrayOfPromises)
        res.send("ok")
    } catch (error) {
        
    }
})
// const uploader = multer({
//     fileFilter: (req, file, multerNext) => {
//         if (file.mimetype !== "image/jpg") {
//             multerNext(createHttpError(400, "You can only upload images"))
//         }else {
//             multer(null, true)
//         }
//     }
// }).single("avatarImg")

// filesRouter.post("/uploadImg", uploader, async (req, res, next) => {
//     try {
//         console.log("FIle:". req.file)
//         await saveAuthorsAvatar(req.file.originalname, req.file.buffer)
//         res.send("ok")
//     } catch (error) {
//         next(error)
//     }
// })


export default filesRouter