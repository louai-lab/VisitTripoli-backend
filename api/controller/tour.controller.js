import toursDb from "../models/tour.models.js";

let defaultId = 0;

async function getLatestId() {
  const lastId = await toursDb.findOne().sort("-id");
  if (!lastId) {
    return defaultId;
  }
  return lastId.id;
}
async function saveTour(tour) {
  try {
    await toursDb.updateOne(
      { title: tour.title },
      { ...tour },
      { upsert: true }
    );
  } catch (err) {
    console.error(`could not save tour ${err}`);
  }
}
async function httpGetAllTours(req, res) {
  let getAllTours = await toursDb
    .find({}, { _id: 0, __v: 0 })
    .sort({ title: 1 });
  return res.status(200).json(await getAllTours);
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
    const newid = (await getLatestId()) + 1;
    const newTour = Object.assign(tour, { id: newid });
    await saveTour(newTour);
    return res.status(200).json(tour);
  }
}

async function httpUpdateTour(req, res) {
  const tour = req.body;
  const image = req.file.path;
  const found = await toursDb.findOne({ id: tour.id });
  if (!tour.id) {
    return res.status(400).json({ error: "enter an id" });
  }
  if (!found) {
    return res.status(400).json({ error: "id not found" });
  }
  tour.image = image;
  try {
    await toursDb.updateOne({ id: tour.id }, { ...tour });
  } catch (err) {
    console.error(`could not save tour ${err}`);
  }
  return res.status(200).json(tour);
}

async function httpDeleteTour(req, res) {
  const found = await toursDb.findOneAndDelete({ id: req.params.id });
  if (found) {
    return res.status(200).json("deleted");
  } else {
    return res.status(404).json("Tours not found");
  }
}
export { httpGetAllTours, httpAddNewTour, httpUpdateTour, httpDeleteTour };
