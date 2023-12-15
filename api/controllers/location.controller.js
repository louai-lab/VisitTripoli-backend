import Location from "../models/locations.model.js";
import fs from "fs";

// Create Location
export const createLocation = async (req, res, next) => {
  const {
    id,
    title,
    address,
    timeFromCenter,
    googleRating,
    entranceFee,
    description,
    smallDescription,
    geoLocation,
  } = req.body;

  //  return res.json({"loc":JSON.parse(geoLocation) })

  const images = req.files;
  let imagePathArray = [];

  for (let i = 0; i < images.length; i++) {
    imagePathArray.push(images[i].path);
  }

  let heroImagePath = imagePathArray[0];

  const newLocation = new Location({
    id,
    title,
    address,
    timeFromCenter,
    googleRating,
    entranceFee,
    description,
    smallDescription,
    geoLocation: JSON.parse(geoLocation),
    images: imagePathArray,
    heroImage: heroImagePath,
  });

  try {
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.json({ error: error.message });
  }
};
export const updateLocation = async (req, res, next) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          id: req.body.id,
          title: req.body.title,
          address: req.body.address,
          timeFromCenter: req.body.timeFromCenter,
          googleRating: req.body.googleRating,
          entranceFee: req.body.entranceFee,
          description: req.body.description,
          smallDescription: req.body.smallDescription,
          geoLocation: req.body.geoLocation,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

export const updateImage = async (req, res, next) => {
  const selectedLocation = await Location.findById(req.params.id);
  const selectedImage = parseInt(req.params.number);
  const oldImage = selectedLocation.images[selectedImage];
  const newImage = req.file;

  try {
    selectedLocation.images[selectedImage] = newImage.path;
    fs.unlink(oldImage, (err) => {
      if (err) throw err;
    });
    await selectedLocation.save();
    res.status(200).json(selectedLocation);
  } catch (error) {
    res.status(400).json({ message: "error updating hero" });
  }
};

export const updateHeroImage = async (req, res) => {
  const selectedLocation = await Location.findById(req.params.id);
  const newHeroImage = req.file.path;
  const oldHeroImage = selectedLocation.heroImage;
  try {
    fs.unlink(oldHeroImage, (err) => {
      if (err) console.log(err);
      return;
    });
    selectedLocation.heroImage = newHeroImage;
    await selectedLocation.save();

    res.status(200).json(selectedLocation);
  } catch (error) {
    res.status(400).json({
      message: "error updating hero",
      newimagepath: newHeroImage.path,
    });
  }
};

export const deleteLocation = async (req, res, next) => {
  const deletedLocation = await Location.findById(req.params.id);

  if (deletedLocation.images) {
    for (let i = 0; i < deletedLocation.images.length; i++) {
      if (fs.existsSync(deletedLocation.images[i])) {
        fs.unlink(`${deletedLocation.images[i]}`, (err) => {
          if (err) res.json({ message: "error deleting images" });
          return;
        });
      }
    }
  }

  if (deletedLocation.heroImage) {
    if (fs.existsSync(deletedLocation.heroImage)) {
      fs.unlink(`${deletedLocation.heroImage}`, (err) => {
        if (err) res.json({ message: "error deleting hero image" });
        return;
      });
    }
  }
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(200).json("Location has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const getOneLocation = async (req, res) => {
  const location = await Location.findOne({ _Id: req.body.id });
  if (!location) {
    return res
      .status(500)
      .json({ error: "can't find location. Double check id" });
  }
  try {
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error: "can't find location. Double check id" });
  }
};
export const getAllLocations = async (req, res) => {
  const allLocations = await Location.find();
  try {
    res.status(200).json(allLocations);
  } catch (error) {
    res.status(500).json({ error: "can't find locations" });
  }
};
