import express from "express";
import locationRouter from './routes/locations.routes.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



// express app
const app = express()
app.use(express.json())
const Port = 3419;

try{
    // app.listen(process.env.PORT, () =>{
        app.listen(Port, () =>{
    // console.log('listening on port ',process.env.PORT)
    console.log('listening on port ',Port)
    })
} catch{
    console.error('Error listening to port');
}

try{
    mongoose.connect(process.env.MONG_ULI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to MongoDB!")
} catch{
    console.error('Error connecting to MongoDB');
}

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/location", locationRouter)