import express from "express";
import {
  createATourLocation,
  getAllTourLocations,
  getOneTourLocation,
  updateATourLocation,
  deleteATourLocation,
} from "../controllers/tourLocation.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createATourLocation); 

router.get("/all", getAllTourLocations);

router.get("/:id", getOneTourLocation);

router.put("/update/:id", upload.single("image"), updateATourLocation);

router.delete("/delete/:id", deleteATourLocation);

export default router;
