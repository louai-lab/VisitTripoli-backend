import location from "../models/location.js";
import fs from "fs";

// To create a location

export const createALocation = async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  const locationImage = req.file.filename;
  try {
    const newLocation = await location.create({
      name,
      image: locationImage,
    });
    await newLocation.save();
    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get all locations

export const getAllLocations = async (req, res) => {
  try {
    const AllLocations = await location.findAll();
    res.status(200).json({ success: true, data: AllLocations });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get one location (by id)

export const getOneLocation = async (req, res) => {
  try {
    const ALocation = await location.findByPk(req.params.id);
    if (!ALocation) {
      res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json({ success: true, data: ALocation });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To update a location

export const updateLocation = async (req, res) => {
  const locationId = req.params.id;

  const oldLocation = await location.findOne({ where: { id: locationId } });

  try {
    const updatedLocation = req.body;

    const oldImagePath = `public/images/${oldLocation.image}`;

    if (req.file) {
      updatedLocation.image = req.file.filename;

      fs.unlinkSync(oldImagePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `error deleting the old image` });
        }
      });
    }

    await oldLocation.update(updatedLocation);
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error in updating the location.` });
  }
};

// To delete a tour

export const deleteALocation = async (req, res) => {
  const { id } = req.params;
  try {
    const ALocation = await location.findByPk(id);
    if (!ALocation) {
      return res
        .status(404)
        .json({ success: false, error: "Location not found" });
    }
    await ALocation.destroy();
    res
      .status(200)
      .json({ success: true, message: "Location has been deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error deleting the locatoion" });
  }
};
