import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
import User from '../models/user.js'

dotenv.config();


// Get All users

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
  
    res.status(200).json(users);
  };