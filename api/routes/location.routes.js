import express from "express";
import {
  createALocation,
  getAllLocations,
  getOneLocation,
  updateLocation,
  deleteALocation,
} from "../controllers/location.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createALocation); 

router.get("/all", getAllLocations);

router.get("/:id", getOneLocation);

router.put("/update/:id", upload.single("image"), updateLocation);

router.delete("/delete/:id", deleteALocation);

export default router;
