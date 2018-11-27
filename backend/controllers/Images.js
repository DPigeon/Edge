const BaseController = require('../Controller')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/')
    },
    filename: (req, file, callback) => {
        const generateFileName = (file) => {
            let startingPoint = file.originalname.lastIndexOf('.')
            let fileType = file.originalname.slice(startingPoint)
            return Date.now() + fileType
        }
        callback(null, generateFileName(file))
    }
})

const ImageUploader = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const t = file.mimetype
        if (t == 'image/jpeg' || t == 'image/jpg' || t == 'image/png') {
            callback(null, true)
        } else {
            const errMsg =
                'wrong myme type, you are trying to upload ' +
                'a file format other than jpeg or png'

            callback(new Error(errMsg), false)
        }
    }
})

const singleImageUpload = ImageUploader.single('myimage')


module.exports.saveImage = (req, res) => {
    const { test, isAuthorized, token } = BaseController.determineTestAndAuth(req)

    // An image can either be the profile_pic of a user, or the cover_pic
    // of a user, or inside of a post. If the post_id is given, then the image
    // is assumed to be inside of a post, otherwise it should be one of profile_pic
    // or cover_pic (which are both just boolean value).

    const { profile_pic, cover_pic, post_id } = req.body

    if (profile_pic && !cover_pic && !post_id) {
        // save the picture name as the profile_pic of the user who issued
        // the request.
    }
    else if (!profile_pic && cover_pic && !post_id) {
        // save the picture name as the cover_pic of the user who issued
        // the request.
    }
    else if (!profile_pic && !cover_pic && post_id) {
        // save the picture name with the post_id associated to it.
    }
    return singleImageUpload(req, res, (err) => {

        if (err) {
            console.log('err =>', err)
            return res.status(400).json({
                success: false,
                message: err.message
            })
        } else if (req.file == undefined) {
            return res.status(400).json({
                success: false,
                message: 'You did not send an image'
            })
        } else {
            console.log('file:', req.file)

            return res.status(200).json({
                success: true,
                message: 'file was successfully saved',
                filename: req.file.filename
            })
        }
    })
}
