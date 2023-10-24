import toursDb from "./tour.mongo.js";

let defaultId = 0;
async function getAllTours() {
  return await toursDb.find({}, { _id: 0, __v: 0 });
}
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

async function addNewTour(tour) {
  const newid = (await getLatestId()) + 1;
  const newTour = Object.assign(tour, { id: newid });
  await saveTour(newTour);
}

async function updateTour(tour) {
  await saveTour(tour);
}

async function deleteTour(id) {
  const found = await toursDb.findOneAndDelete({ id: id });
  if (found) {
    return true;
  }
  return false;
}

export { getAllTours, addNewTour, updateTour, deleteTour };
