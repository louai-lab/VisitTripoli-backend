import Request from "../models/request.js"
import Tours from "../models/tour.js"

export const createRequest = async (req, res) => {
    const { visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const tour = await Tours.findOne({ where: { id: tourId } })
        if (!tour)
            return res.status(404).send(`Cannot request, Tour ${tourId} doesn't exist`)
        const newRequest = await Request.create({
            visitorName, visitorEmail, visitorPhone, tourId
        })
        return res.status(200).json({ message: 'Request Created Successfully!', Request: newRequest })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll()
        res.status(200).json({ Requests: requests })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getOneRequest = async (req, res) => {
    const id = req.params.id
    try {
        const request = await Request.findOne({ where: { id: id } })
        request ? res.status(200).json({ Request: request }) :
        res.status(404).send(`Request with ID ${id} is not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getRequestsByTourId = async (req, res) => {
    const tourId = req.params.tourId
    try {
        const requests = await Request.findAll({ where: { tourId: tourId } })
        requests ? res.status(200).json({ Requests: requests }) :
        res.status(404).send(`Requests with TourID ${tourId} are not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getRequestsByDate = async (req, res) => {
    const date = req.params.date
    try {
        const requests = await Request.findAll({ where: { createdAt: date } })
        requests ? res.status(200).json({ Requests: requests }) :
        res.status(404).send(`Requests by the Date ${date} are not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const updateRequest = async (req, res) => {
    const id = req.params.id
    const { visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const tour = await Tours.findOne({ where: { id: tourId } })
        if (!tour)
            return res.status(404).send(`Cannot request, Tour ${tourId} doesn't exist`)
        const request = await Request.findOne({ where: { id: id } })
        if (!request)
            res.status(404).send(`User ${id} does not exist!`)
        const editRequest = await Request.update({ visitorName, visitorEmail, visitorPhone, tourId }, { where: { id: id } })
        editRequest ? res.status(200).json({ message: `The request ${id} has been successfully updated!`, Request: request }) :
        res.status(404).send(`Error occured, Request ${id} could not be updated!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const deleteRequest = async (req, res) => {
    const id = req.params.id
    try {
        const request = await Request.findOne({ where: { id: id } })
        if (!request)
            res.status(404).send(`User ${id} does not exist!`)
        await request.destroy()
        res.status(200).send(`The Request ${id} has been successfully deleted!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}