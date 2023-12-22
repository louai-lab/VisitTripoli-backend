import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js'
import  {login } from './controllers/login.controller.js'
import { logOut } from "./middleware/auth.js";


import cookieParser from "cookie-parser";


import toursRoutes from './routes/tour.routes.js'

dotenv.config();

import { verifyToken } from "./middleware/auth.js";
import sequelize from '../api/config/dbConnection.js'

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

// app.use("/locations", locationRouter);
// app.use("/tours", toursRouter);
// app.use("/locations", locationRouter);
app.use(express.static('public'));
app.use("/images",express.static("images"))

// app.use("/api/hotel", hotelRouter);
app.use('/user',userRouter)
app.use("/tours", toursRoutes)
app.post('/login', login )
app.get('/logout',logOut)


app.get('/protected-route', verifyToken, (req, res) => {
  
  const userId = req.user.userId;
  
  res.json({ message: 'Protected route is working', userId });
});

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });

  // Synchronize models with the database, using alter
sequelize.sync({ alter: true })
.then(() => {
  console.log('Database synchronized successfully.');
})
.catch((error) => {
  console.error('Error synchronizing database:', error);
});
