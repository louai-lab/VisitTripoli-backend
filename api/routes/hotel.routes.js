import express from 'express'
import { createHotel, getAllHotels, getOneHotel, getHotelsByUser, updateHotel, deleteHotel } from '../controllers/hotel.controller.js'
import { upload } from '../middleware/multer.js'

const router = express.Router()

router.post('/create', upload.single('image'), createHotel)
router.get('/read-all', getAllHotels)
router.get('/read-one', getOneHotel)
router.get('/read-by-user', getHotelsByUser)
router.patch('/update', upload.single('image'), updateHotel)
router.delete('/delete', deleteHotel)

export default router