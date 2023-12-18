import express from "express";
import cors from "cors";
import 'dotenv/config'
import sequelize from "./config/dbConnection.js"

import userRouter from './routes/user.routes.js'
import { toursRouter } from "./routes/tour.router.js";
import locationRouter from "./routes/locations.routes.js";
import hotelRouter from "./routes/hotel-route.js";

const app = express();
app.use(express.json());

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
app.use("/api/hotel", hotelRouter);
app.use("/api/hotel", hotelRouter);
app.use('/user',userRouter)

app.use("/images", express.static("images"))

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
