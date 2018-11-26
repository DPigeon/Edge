const multer = require('multer')

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
    storage: storage,
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
