import express from "express";
import path from "path";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import User from "../oldModels/user.model.js";

dotenv.config();

// Get All users

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

// Register

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
       res.status(400).json({ error: "Email already exists" });
      // fs.unlink(req.file.path)
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!req.file) {
      return res.status(400).json({ error: "Upload an image" });
    }

    const image = req.file.path;

    const newUser = new User({ name, email, password: hashedPassword, image });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id}, process.env.SECRET_TOKEN, { expiresIn: '24h' });
    res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'None' });

    res.status(201).json({ user: newUser , token });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(req.file.path)
    res.status(500).json({ error: "Internal server error" })
  }
};



// get a user

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such an user" });
  }

  res.status(200).json(user);
};

// update a user

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const oldUser = await User.findById(id);

  try {
    const updatedData = req.body;

    const oldImagePath = `${oldUser.image}`;

    console.log("Old Image Path:", oldUser.image);

    if (req.file) {
      updatedData.image = req.file.path;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          return res.status(500).json({
            error: `error deleting the old image`,
          });
        }
      });
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
    });

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      error: `Error, ${error.message}`,
    });
  }
};

export { getAllUsers, register, getUser, updateUser };