import express from "express"
import multer from "multer"
import createHttpError from "http-errors"

const filesRouter = express.Router()

const uploader = multer({
    fileFilter: (req, file, multerNext) => {
        if (file.mimetype !== "image") {
            multerNext(createHttpError(400, "You can only upload images"))
        }else {
            multer(null, true)
        }
    }
}).single("avatarImg")

filesRouter.post("/uploadImg", uploader, async (req, res, next) => {
    try {
        await saveUsersAvatar(req.file.originalname, req.file.buffer)
        res.send("ok")
    } catch (error) {
        next(error)
    }
})


export default filesRouter