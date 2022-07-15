const multer = require('multer')

const stuff = multer.diskStorage({
    destination: function (req, file, cb) {
        
        if(file.mimetype.startsWith('image')){
            cb(null, './user_resources/image.res')
        }
        if(file.mimetype.startsWith('video')){
            cb(null, './user_resources/video.res')
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: stuff })

module.exports = { upload }