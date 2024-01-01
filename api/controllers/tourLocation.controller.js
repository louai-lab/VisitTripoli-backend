import tourLocation from '../models/tourlocation.js';

// To create a tour-location

export const createATourLocation = async (req, res) => {
  const { tourId, locationId } = req.body;
  try {
    const newLocation = await tourLocation.create({
      tourId,
      locationId,
    });
    await newLocation.save();
    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get all tour-locations

export const getAllTourLocations = async (req, res) => {
  try {
    const AllTourLocations = await tourLocation.findAll();
    res.status(200).json({ success: true, data: AllTourLocations });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get one tour-location (by id)

export const getOneTourLocation = async (req, res) => {
  try {
    const ATourLocation = await tourLocation.findByPk(req.params.id);
    if (!ATourLocation) {
      res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json({ success: true, data: ATourLocation });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To update a tour-Location

export const updateATourLocation = async (req, res) => {
  const { id } = req.params;
  const { tourId, locationId } = req.body;
  try {
    const ATourLocation = await tourLocation.findByPk(id);
    if (!ATourLocation) {
      return res.status(404).json({ success: false, error: "Location not found" });
    }
    await ATourLocation.update({
      tourId,
      locationId
    });
    res.status(200).json({ success: true, data: ATourLocation });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating the location" });
  }
};

// To delete a tour-Location

export const deleteATourLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const ATourLocation = await tourLocation.findByPk(id);
    if (!ATourLocation) {
      return res.status(404).json({ success: false, error: "Location not found" });
    }   
    await ATourLocation.destroy();
    res.status(200).json({ success: true, message: "Location has been deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error deleting the location" });
  }
};
