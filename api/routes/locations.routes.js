import express from 'express';
import {} from "../controllers/location.controller.js"

const router = express.Router();

router.post('/create', createLocation);
router.delete("/delete/:id", deleteLocation);
router.put("/update/:id", updateLocation);
router.get("/:id", getOneLocation);

export default router;