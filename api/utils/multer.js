import multer from "multer";
import path from "path";
// const fs = require("fs");

// const uploadDirectory = "images";

// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imagesTour");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
export default upload;
