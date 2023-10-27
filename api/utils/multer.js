import multer from "multer";
import path from "path";
// const fs = require("fs");

// const uploadDirectory = "images";

// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
// export default upload;
///////////////////////////////////////


// const express = require('express');
// const multer = require('multer');

// const app = express();

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads
// app.post('/upload', upload.array('files', 5), (req, res) => {
//   // req.files contains an array of uploaded files
//   res.send('Files uploaded successfully!');
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

export default upload;