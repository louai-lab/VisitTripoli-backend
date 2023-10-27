import  express  from "express";

import upload from '../controllers/hotel-controller'

const router = express.Router();

import {
        getAllHotel,
        createHotel,
        deleteHotel,
        updateHotel}  from '../controllers/hotel-controller.js'

router.get('/', getAllHotel)

router.post('/create',upload.single('image'), createHotel)

router.delete('/delete/:id', deleteHotel)

router.patch('/update/:id', updateHotel)
//upload images



export default router