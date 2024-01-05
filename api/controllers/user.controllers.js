import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
import User from "../models/user.js";

dotenv.config();

// get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
    // console.log(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get one user

const getOneUser = async ( req,res)=>{
  const userId = req.user.userId;

  try{
      const user = await User.findOne({where:{id:userId}})

      if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
  }

}


// Register

const register = async (req, res) => {
  const { name, email, password , role } = req.body;

  try {
    const existingUser = await User.findOne({ where: {email} });

    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!req.file) {
      res.status(400).json({ error: "upload an image" });
    }

    const image = req.file.filename;

    const newUser = await User.create({
      name,
      email,
      password : hashedPassword,
      image,
      role:role || "guide",
    });

    const token = jwt.sign({ userId: newUser.id}, process.env.SECRET_TOKEN, { expiresIn: '24h' });
    res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'None' });
    

    // await newUser.save();
    res.status(201).json(newUser);
    // console.log(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    console.log(error);
  }
};


// update an user

const updateUser = async ( req,res) =>{
  const userId = req.params.id;

  const oldUser = await User.findOne({where:{id:userId}})

  try{
      const updatedUser = req.body ;

      const oldImagePath = `public/images/${oldUser.image}`;

      if(req.file){
          updatedUser.image = req.file.filename;

          fs.unlinkSync(oldImagePath,(err)=>{
              if(err){
                  return res.status(500).json({error:`error deleting the old image`})
              }
          })
      }

      await oldUser.update(updatedUser)
      res.status(200).json(updatedUser);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error , ${error.message}` });
    }
}



// delete an user

const deleteUser = async (req,res)=>{
  const userId = req.params.id;

  try{
      const userToDelete = await User.findOne({
          where:{id:userId}
      })

      if(!userToDelete){
          return res.status(404).json({ error: "user not found" });
      }

      await userToDelete.destroy();

      const oldImagePath = `public/images/${userToDelete.image}`;

      fs.unlink(oldImagePath, (err) => {
          if (err) {
            return res.status(500).json({ error: `error deleting the old image` });
          }
        });
    
        res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

}




export { getAllUsers, register , getOneUser , updateUser , deleteUser};
