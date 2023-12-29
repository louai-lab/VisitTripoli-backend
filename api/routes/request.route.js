import express from 'express'
import { createRequest, getAllRequests, getOneRequest, getRequestsByDate, getRequestsByTourId, updateRequest, deleteRequest } from '../controllers/request.controller'

const router = express.Router()

router.post('/create', createRequest)
router.get('/read-all', getAllRequests)
router.get('/read-one', getOneRequest)
router.get('/read-by-tourid', getRequestsByTourId)
router.get('/read-by-date', getRequestsByDate)
router.patch('/update', updateRequest)
router.delete('/delete', deleteRequest)

export default router