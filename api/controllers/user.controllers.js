import express from 'express'
import path from 'path'
import fs from "fs"
import mongoose from 'mongoose';
import User from '../models/user.model.js';

// Get All users

const getAllUsers = async (req, res) => {
    const users = await User.find({});
  
    res.status(200).json(users);
  };


  // Add a user

const addUser = async (req,res)=>{
    const {name , email , password} = req.body

    if(!req.file){
        res.status(400).json({error:"upload an image"})
    }

    const image = req.file.path

    try{
        const newUser = new User({name,email,password,image})
        await newUser.save()
        res.status(201).json({user:newUser})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
  }


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



  export {getAllUsers , addUser , getUser , updateUser}