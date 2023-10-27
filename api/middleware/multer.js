import multer from "multer"

import  path  from "path"

// import fs from "fs"

// const uploadDirection = "images"

// if(!fs.existsSync(uploadDirection)){
//     fs.mkdirSync(uploadDirection)
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

 const upload = multer({
    storage: storage})
//     fileFilter: (req, file, callback) => {

//     if (file.mimetype === "image/png" || file.mimetype === "image/jpg")
//         callback(null, true)

//     else{
//         console.log("")
//         callback(null, false)
//     }
// }})
export default upload