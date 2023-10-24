import express from 'express';
import {
createLocation, 
deleteLocation,
updateLocation,
getOneLocation,
getAllLocations,
} from "../controllers/location.controller.js"
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/create',upload.array("formimages"), createLocation);
router.delete("/delete/:id", deleteLocation);
router.put("/update/:id", updateLocation);
router.get("/:id", getOneLocation);
router.get("/", getAllLocations);

export default router;