import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './oldRoutes/user.routes.js'
import  {login } from "./oldControllers/login.controller.js";
import { logOut } from "./middleware/auth.js";

import hotelRouter from "./oldRoutes/hotel-route.js";
import cookieParser from "cookie-parser";

dotenv.config();

import { toursRouter } from "./oldRoutes/tour.router.js";
import locationRouter from "./oldRoutes/locations.routes.js";
import { verifyToken } from "./middleware/auth.js";
import sequelize from '../api/config/dbConnection.js'

import tourRoutes from './routes/tour-routes.js';

// express app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

try {
  await sequelize.authenticate()
  console.log('connection established!')
}
catch (error) {
  console.log('unable to connect!')
}

app.use("/tours", toursRouter);
app.use("/locations", locationRouter);
app.use("/images", express.static("images"));

app.use("/api/hotel", hotelRouter);
app.use('/user',userRouter)
app.post('/login', login )
app.get('/logout',logOut)

app.use("/tour", tourRoutes);

app.get('/protected-route', verifyToken, (req, res) => {
  
  const userId = req.user.userId;
  
  res.json({ message: 'Protected route is working', userId });
});

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
