import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

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
            console.log(user)
        
      } else {
        res.status(401).json({ error: "Email or Password is incorrect" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };