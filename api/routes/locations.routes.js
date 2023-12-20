import express from "express";
import {
  createLocation,
  deleteLocation,
  updateLocation,
  getOneLocation,
  getAllLocations,
  updateImage,
  updateHeroImage,
} from "../oldControllers/location.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.array("formimages"), createLocation);
router.delete("/delete/:id", deleteLocation);
router.put("/update/:id", updateLocation);
router.put(
  "/update/image/:id/:number",
  upload.single("formimages"),
  updateImage
);
router.put("/update/image/:id", upload.single("formimages"), updateHeroImage);

router.get("/:id", getOneLocation);
router.get("/", getAllLocations);

export default router;
