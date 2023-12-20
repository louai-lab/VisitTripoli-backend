import mongoose from "mongoose";
import User from "./user.model.js";

const visitorSchema = new mongoose.Schema({}, { timestamps: true });

const Visitor = User.discriminator("Visitor",visitorSchema);

export {Visitor}