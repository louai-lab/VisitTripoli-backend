import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  timeFromCenter: {
    type: String,
    required: true,
  },
  googleRating:{
    type: Number,
    required: true,
  },
  entranceFee: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  smallDescription:{
    type: String,
    required: true,
  },
  geoLocation: {
    type: String,
    required: true,
  },
  images: { 
    type: [String]
  },
  video: {
    type: [String]
  }
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
