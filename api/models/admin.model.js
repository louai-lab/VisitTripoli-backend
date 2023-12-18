import mongoose from "mongoose";
import User from "./user.model.js";

const adminSchema = new mongoose.Schema({}, { timestamps: true });

const Admin = User.discriminator("Admin", adminSchema);

export { Admin };
