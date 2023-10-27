import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";

import hotelRouter from "./routes/hotel-route.js"

dotenv.config();

// express app
const app = express();
app.use(express.json());


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

app.use('/api/hotel', hotelRouter)

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

