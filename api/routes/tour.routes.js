import express from "express";
import {
  creatATtour,
  getAllTours,
  getOneTour,
  updateTour,
  deleteATour,
} from "../controllers/tour.controllers.js";

const router = express.Router();

router.post("/create", creatATtour); // Create a tour

router.get("/all", getAllTours); // Get all tours

router.get("/:id", getOneTour); // Get one tour

router.put("/update/:id", updateTour); // Update a tour

router.delete("/delete/:id", deleteATour); // Delete a tour

export default router;
