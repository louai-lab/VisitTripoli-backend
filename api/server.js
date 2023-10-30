import express from "express";

import mongoose from "mongoose";
// import path, { dirname } from "path";
import dotenv from "dotenv";

import hotelRouter from "./routes/hotel-route.js"

dotenv.config();

import { toursRouter } from "./routes/tour.router.js";
import locationRouter from "./routes/locations.routes.js";

// express app
const app = express();
app.use(express.json());

app.use("/tours", toursRouter);
app.use("/locations", locationRouter);
// app.use("/uploads", express.static(path.join(__dirname, "images")));

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONG_ULI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  // app.listen(process.env.PORT, () => {
  //   console.log("listening on port: " + process.env.PORT);
  // });
})
}

startServer();

app.use('/api/hotel', hotelRouter)

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

