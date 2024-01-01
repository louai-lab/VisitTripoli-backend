import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import { login } from "./controllers/login.controller.js";
import { logOut } from "./middleware/auth.js";
import requestRouter from './routes/request.route.js'
import hotelRouter from './routes/hotel.routes.js'

import cookieParser from "cookie-parser";

import toursRoutes from "./routes/tour.routes.js";

dotenv.config();

import { verifyToken } from "./middleware/auth.js";
import sequelize from "../api/config/dbConnection.js";
import locationRouter from './routes/location.routes.js';
import tourLocationRouter from './routes/tourLocation.routes.js'

// express app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

try {
  await sequelize.authenticate();
  console.log("connection established!");
} catch (error) {
  console.log("unable to connect!");
}

app.use(express.static("public"));
app.use("/images", express.static("images"));

// app.use("/api/hotel", hotelRouter);
app.use("/user", userRouter);
app.use("/tours", toursRoutes);
app.post("/login", login);
app.get("/logout", logOut);
app.use('/request', requestRouter)
app.use('/hotel', hotelRouter)
app.use('/location', locationRouter)
app.use('/tourLocation', tourLocationRouter);

app.get("/protected-route", verifyToken, (req, res) => {
  const userId = req.user.userId;

  res.json({ message: "Protected route is working", userId });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});


// // Synchronize models with the database, using alter
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Database synchronized successfully.");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing database:", error);
//   });