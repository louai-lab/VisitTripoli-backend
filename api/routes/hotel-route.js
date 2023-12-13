import express from "express";

const router = express.Router();

import upload from "../middleware/multer.js";

import {
  getAllHotel,
  createHotel,
  deleteHotel,
  updateHotel,
} from "../controllers/hotel-controller.js";

router.get("/", getAllHotel);

router.post("/create", upload.single("image"), createHotel);

router.delete("/delete/:id", upload.single("image"), deleteHotel);

router.patch("/update/:id", updateHotel);

export default router;
