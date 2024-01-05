import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
// import bcryptjs from 'bcryptjs';

dotenv.config();

// login

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
  
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      const user = await User.findOne({ where: {email} });
  
      if (!user) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        });

        // user.token = token;
        await user.update({token})

          res
            .cookie("access_token", token, {
              httpOnly: true,
              secure: "true",
              sameSite: "None",
            })
            .status(200)
            .json(user);
            // console.log(user)
        
      } else {
        res.status(401).json({ error: "Email or Password is incorrect" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// login with google

export const loginWithGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {email: req.body.email} });

        if (user) {
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            });
            await user.update({ token })
              res
                .cookie("access_token", token, {
                  httpOnly: true,
                  secure: "true",
                  sameSite: "None",
                })
                .status(200)
                .json(user);
        } else {
            /* This is from the user controller */
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const generatedName = req.body.name.split(" ").join(" ").toLowerCase();

              const imagee = req.body.image;
          
              const newUser = await User.create({
                name: generatedName,
                email: req.body.email,
                password : hashedPassword,
                image: imagee,
              });
          
              const token = jwt.sign({ userId: newUser.id}, process.env.SECRET_TOKEN, { expiresIn: '24h' });
              res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'None' });
              
          
              // await newUser.save();
              res.status(201).json(newUser);
        }
    } catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}