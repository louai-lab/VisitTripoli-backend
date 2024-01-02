import express from 'express'
import { createRequest, getAllRequests, getOneRequest, getRequestsByDate, getRequestsByTourId, updateRequest, deleteRequest } from '../controllers/request.controller.js'

const router = express.Router()

router.post('/create', createRequest)
router.get('/read-all', getAllRequests)
router.get('/read/:id', getOneRequest)
router.get('/readByTourid/:tourId', getRequestsByTourId)
router.get('/readByDate/:date', getRequestsByDate)
router.patch('/update/:id', updateRequest)
router.delete('/delete/:id', deleteRequest)

export default router