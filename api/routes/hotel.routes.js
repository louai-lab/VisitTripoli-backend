import express from 'express'
import { createHotel, getAllHotels, getOneHotel, getHotelsByUser, updateHotel, deleteHotel } from '../controllers/hotel.controller.js'
import { upload } from '../middleware/multer.js'

const router = express.Router()

router.post('/create', upload.single('image'), createHotel)
router.get('/read-all', getAllHotels)
router.get('/read/:id', getOneHotel)
router.get('/readByUser/:userId', getHotelsByUser)
router.patch('/update/:id', upload.single('image'), updateHotel)
router.delete('/delete/:id', deleteHotel)

export default router