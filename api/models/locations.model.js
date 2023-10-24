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
    type: [Number],
    required: true,
  },
  images:[{ 
    type: String,
    required: true,
  }],
  video: {
    type: [String]
  }
},{timestamps: true});

const Location = mongoose.model("Location", locationSchema);

export default Location;
