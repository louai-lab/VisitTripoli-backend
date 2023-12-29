import db from '../models/index.js'

const { requestModel, tourModel } = db

export const createRequest = async (req, res) => {
    const { date, visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!date || !visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const newRequest = await requestModel.create({
            date, visitorName, visitorEmail, visitorPhone, tourId
        })
        res.status(200).json({ message: 'Request Created Successfully!', request: newRequest })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getAllRequests = async (req, res) => {
    try {
        const requests = requestModel.findAll({ include: [tourModel] })
        res.status(200).json({ Requests: requests })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getOneRequest = async (req, res) => {
    const id = req.body.id
    try {
        const request = await requestModel.findOne({ where: { id: id }, include: [tourModel] })
        request ? res.status(200).json({ Request: request }) :
        res.status(404).send(`Request with ID ${id} is not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getRequestsByTourId = async (req, res) => {
    const tourId = req.body.tourId
    try {
        const requests = await requestModel.findAll({ where: { tourId: tourId }, include: [tourModel] })
        requests ? res.status(200).json({ Requests: requests }) :
        res.status(404).send(`Requests with TourID ${tourId} are not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getRequestsByDate = async (req, res) => {
    const date = req.body.date
    try {
        const requests = await requestModel.findAll({ where: { date: date }, include: [tourModel] })
        requests ? res.status(200).json({ Requests: requests }) :
        res.status(404).send(`Requests by the Date ${date} are not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const updateRequest = async (req, res) => {
    const id = req.body.id
    const { date, visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!date || !visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const request = await requestModel.findOne({ where: { id: id } })
        if (!request)
            res.status(404).send(`User ${id} does not exist!`)
        const editRequest = await requestModel.update({ date, visitorName, visitorEmail, visitorPhone, tourId }, { where: { id: id } })
        editRequest ? res.status(200).json({ message: `The request ${id} has been successfully updated!`, Request: editRequest }) :
        res.status(404).send(`Error occured, Request ${id} could not be updated!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const deleteRequest = async (req, res) => {
    const id = req.body.id
    try {
        const request = await requestModel.findOne({ where: { id: id } })
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