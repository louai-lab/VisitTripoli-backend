import Request from "../models/request.js"

export const createRequest = async (req, res) => {
    const { date, visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const newRequest = await Request.create({
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
        const requests = Request.findAll()
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
        const requests = await Request.findAll({ where: { date: date } })
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
    const { date, visitorName, visitorEmail, visitorPhone, tourId } = req.body
    if (!date || !visitorName || !visitorEmail || !visitorPhone || !tourId)
        res.status(400).send('All the fields are required!')
    try {
        const request = await Request.findOne({ where: { id: id } })
        if (!request)
            res.status(404).send(`User ${id} does not exist!`)
        const editRequest = await Request.update({ date, visitorName, visitorEmail, visitorPhone, tourId }, { where: { id: id } })
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