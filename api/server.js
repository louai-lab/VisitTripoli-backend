import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import hotelRouter from "./routes/hotel-route.js";

dotenv.config();

import { toursRouter } from "./routes/tour.router.js";
import locationRouter from "./routes/locations.routes.js";

// express app
const app = express();
app.use(express.json());

app.use(cors());
app.use("/tours", toursRouter);
app.use("/locations", locationRouter);
app.use("/images", express.static("images"));
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
  });
}

startServer();

app.use("/api/hotel", hotelRouter);
