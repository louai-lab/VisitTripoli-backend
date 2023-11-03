import express from "express";
import {
  httpGetAllTours,
  httpAddNewTour,
  httpUpdateTour,
  httpDeleteTour,
} from "../controllers/tour.controller.js";
import upload from "../middleware/multer.js";

const toursRouter = express.Router();

toursRouter.get("/", httpGetAllTours);
toursRouter.post("/add", upload.single("image"), httpAddNewTour);
toursRouter.put("/update/:id", upload.single("image"), httpUpdateTour);
toursRouter.delete("/delete/:id", httpDeleteTour);

export { toursRouter };
