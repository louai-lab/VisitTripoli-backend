import Tour from "../models/tour";

// To create a tour

export const creatATtour = async (req, res) => {
  const { title, startTime, endTime, price, userId } = req.body;
  const tourImage = req.file.filename;
  try {
    const newTour = await Tour.create({
      title,
      startTime,
      endTime,
      price,
      image: tourImage,
      userId,
    });
    res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get all tours

export const getAllTours = async (req, res) => {
  try {
    const AllTours = await Tour.findAll();
    res.status(200).json({ success: true, data: AllTours });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To get one tour (by id)

export const getOneTour = async (req, res) => {
  try {
    const ATour = await Tour.findByPk(req.params.id);
    // const ATour = await Tour.findOne({ where: { req.params.id } });
    if (!ATour) {
      res.status(404).json({ error: 'Tour not found' });
    }
    res.status(200).json({ success: true, data: ATour });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// To update a tour

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, startTime, endTime, price, userId } = req.body;
  const imageTour = req.file.filename;
  try {
    const ATour = await Tour.findByPk(id);
    if (!ATour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    await ATour.update({ title, startTime, endTime, price, image: imageTour, userId });
    res.status(200).json({ success: true, data: ATour });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating the tour" });
  }
};

// To delete a tour

export const deleteATour = async (req, res) => {
  const { id } = req.params;
  try {
    const ATour = await Tour.findByPk(id);
    if (!ATour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    await ATour.destroy();
    res.status(200).json({ success: true, message: "Tour has been deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error deleting the tour" });
  }
};
