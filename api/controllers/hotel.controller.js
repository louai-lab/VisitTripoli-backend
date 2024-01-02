import Hotel from '../models/hotel.js'
import fs from 'fs/promises'

export const createHotel = async (req, res) => {
    const { title, rating, link, image, userId } = req.body
    if (!title || !rating || !link || !image || !userId)
        res.status(400).send('All fields are required!')
    try {
        const newHotel = await Hotel.create({
            title, rating, link, image, userId
        })
        res.status(200).json({ message: 'Hotel created successfully!', Hotel: newHotel })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findAll()
        res.status(200).json({ Hotels: hotels })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getOneHotel = async (req, res) => {
    const id = req.params.id
    try {
        const hotel = await Hotel.findOne({ where: { id: id } })
        hotel ? res.status(200).json({ Hotel: hotel }) :
        res.status(404).send(`Hotel with ID ${id} is not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getHotelsByUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const hotels = await Hotel.findAll({ where: { userId: userId } })
        hotels ? res.status(200).json({ Hotels: hotels }) :
        res.status(404).send(`Hotel with user ID ${userId} is not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const updateHotel = async (req, res) => {
    const id = req.params.id
    const newImage = req.file?.filename
    const { title, rating, link, userId } = req.body
    if (!title || !rating || !link || !userId)
        res.status(400).send('All fields are required!')
    try {
        const hotel = await Hotel.findOne({ where: { id: id } })
        const oldImage = hotel.image
        if (!hotel)
            res.status(404).send(`Hotel with ID ${id} is not found!`)
        const editHotel = await Hotel.update({ title, rating, link, image: newImage, userId }, { where: { id: id } })
        if (newImage)
            await fs.unlink(oldImage)
        editHotel ? res.status(200).json({ message: `Hotel with ID ${id} has been updated successfully!`, Hotel: hotel }) :
        res.status(404).send(`Error occured, Hotel ${id} could not be updated!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const deleteHotel = async (req, res) => {
    const id = req.params.id
    try {
        const hotel = await Hotel.findOne({ where: { id: id } })
        if (!hotel)
            res.status(400).send(`Hotel ${id} does not exist!`)
        await hotel.destroy()
        res.status(200).send(`Hotel ${id} has been deleted successfully!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}