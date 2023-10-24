import {
  getAllTours,
  addNewTour,
  updateTour,
  deleteTour,
} from "../models/tour.model.js";
async function httpGetAllTours(req, res) {
  return res.status(200).json(await getAllTours());
}

async function httpAddNewTour(req, res) {
  const tour = req.body;
  const image = req.file.path;
  if (!tour.title || !tour.description || !tour.link) {
    return res.status(400).json({ error: "missing required property" });
  } else if (!image) {
    return res.status(400).json({ error: "missing image" });
  } else {
    tour.image = image;
    await addNewTour(tour);
    return res.status(200).json(tour);
  }
}

async function httpUpdateTour(req, res) {
  const tour = req.body;
  const image = req.file.path;
  tour.image = image;
  await updateTour(tour);
  return res.status(200).json(tour);
}

async function httpDeleteTour(req, res) {
  if (await deleteTour(req.params.id)) {
    return res.status(200).json("deleted");
  } else {
    return res.status(404).json("Tours not found");
  }
}
export { httpGetAllTours, httpAddNewTour, httpUpdateTour, httpDeleteTour };
