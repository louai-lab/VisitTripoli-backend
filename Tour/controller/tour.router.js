import express from "express";
import {
  httpGetAllTours,
  httpAddNewTour,
  httpUpdateTour,
  httpDeleteTour,
} from "./tour.controller.js";
import multer from "multer";
import path from "path";
// const fs = require("fs");

const toursRouter = express.Router();

// const uploadDirectory = "images";

// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// }
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

toursRouter.get("/", httpGetAllTours);
toursRouter.post("/add", upload.single("image"), httpAddNewTour);
toursRouter.put("/update", upload.single("image"), httpUpdateTour);
toursRouter.delete("/delete/:id", httpDeleteTour);

export { toursRouter };
