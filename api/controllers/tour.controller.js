import toursDb from "../models/tour.models.js";
import fs from "fs";
import path from "path";

let defaultId = 0;

async function getLatestId() {
  const lastId = await toursDb.findOne().sort("-id");
  if (!lastId) {
    return defaultId;
  }
  return lastId.id;
}

function removeImage(image) {
  fs.unlink(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

async function httpGetAllTours(req, res) {
  let getAllTours = await toursDb
    .find({}, { _id: 0, __v: 0 })
    .sort({ title: 1 });
  return res.status(200).json(getAllTours);
}

async function httpAddNewTour(req, res) {
  const tour = req.body;
  const image = req.file.path;
  if (!tour.title || !tour.description || !tour.link) {
    if (image) {
      removeImage(image);
    }
    return res.status(400).json({ error: "missing required property" });
  } else if (!image) {
    return res.status(400).json({ error: "missing image" });
  } else {
    tour.image = image;
    const newid = (await getLatestId()) + 1;
    let newTour = new toursDb({ ...tour, id: newid });
    try {
      let found = await toursDb.findOne({ title: newTour.title });
      if (!found) {
        await newTour.save();
      } else {
        if (image) {
          removeImage(image);
        }
        return res
          .status(400)
          .json({ error: `Duplicated title could not save tour` });
      }
    } catch (err) {
      console.error(`could not save tour ${err}`);
    }
    return res.status(200).json(newTour);
  }
}

async function httpUpdateTour(req, res) {
  const tour = req.body;
  tour.id = req.params.id;
  const newImage = req.file.path;
  const found = await toursDb.findOne({ id: tour.id });
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "id not found" });
  }
  const oldImage = found.image;

  try {
    if (oldImage !== newImage) {
      tour.image = newImage;
      await toursDb.updateOne({ id: tour.id }, { ...tour });

      if (oldImage) {
        removeImage(oldImage);
      }
    }
    return res.status(200).json(tour);
  } catch (err) {
    console.error(`could not save tour ${err}`);
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(500).json({ error: "server error" });
  }
}

async function httpDeleteTour(req, res) {
  const found = await toursDb.findOneAndDelete({ id: req.params.id });
  if (found) {
    if (found.image) {
      removeImage(found.image);
    }
    return res.status(200).json("deleted");
  } else {
    return res.status(404).json("Tours not found");
  }
}
export { httpGetAllTours, httpAddNewTour, httpUpdateTour, httpDeleteTour };
