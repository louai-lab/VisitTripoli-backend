import Hotel from '../models/hotel-model.js'

import mongoose from 'mongoose'

// get all hotels
export const getAllHotel = async (req, res) => {
    const hotels = await Hotel.find().sort({createdAt: -1})

    res.status(200).json(hotels)
}

//create a hotel
export const createHotel = async (req, res) => {
    const { id, time, rating, link } = req.body
    const image = req.file.path;
    try{
        const hotel = await Hotel.create({ id, image, time, rating, link })
        res.status(200).json(hotel)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// delete a hotel
export const deleteHotel = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such hotel"})
    }

    const hotel = await Hotel.findOneAndDelete({_id: id},{
    })

    if(!hotel){
        return res.status(404).json({error:"no such hotel"})
    }
    res.status(200).json(hotel)
}

// update a hotel
export const updateHotel = (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such hotel"})
    }

    const hotel = Hotel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!hotel){
        return res.status(404).json({error: "no such hotel"})
    }
    res.status(200).json(hotel)
};


// export default upload