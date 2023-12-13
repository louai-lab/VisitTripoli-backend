import Hotel from "../models/hotel-model.js";

import mongoose from "mongoose";

import fs from "fs";

// get all hotels
export const getAllHotel = async (req, res) => {
  const hotels = await Hotel.find().sort({ createdAt: -1 });

  res.status(200).json(hotels);
};

//create a hotel
export const createHotel = async (req, res) => {
  const { id, time, rating, link, title, address } = req.body;
  const image = req.file.path;
  try {
    const hotel = await Hotel.create({
      id,
      image,
      time,
      rating,
      link,
      title,
      address,
    });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a hotel
export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such hotel" });
  }

  const hotel = await Hotel.findById({ _id: id }, {});
  if (hotel.image) {
    fs.unlink(hotel.image, (err) => {
      if (err) throw err;
    });
  }

  if (!hotel) {
    return res.status(404).json({ error: "no such hotel" });
  }

  await Hotel.findOneAndDelete({ _id: id });

  res.status(200).json({ message: "hotel deleted" });
};

// update a hotel
export const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const newhotel = await Hotel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(newhotel);
  } catch (err) {
    res.json({ error: err.message });
  }
};
