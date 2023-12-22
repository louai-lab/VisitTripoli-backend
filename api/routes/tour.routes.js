import express from "express";
import {
  creatATtour,
  getAllTours,
  getOneTour,
  updateTour,
  deleteATour,
} from "../controllers/tour.controllers.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), creatATtour); // Create a tour

router.get("/all", getAllTours); // Get all tours

router.get("/:id", getOneTour); // Get one tour

router.put("/update/:id", upload.single("image"), updateTour); // Update a tour

router.delete("/delete/:id", deleteATour); // Delete a tour

export default router;
