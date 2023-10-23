import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



// express app
const app = express()
app.use(express.json())


try{
    app.listen(process.env.PORT, () =>{
    console.log('listening on port ',process.env.PORT)
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