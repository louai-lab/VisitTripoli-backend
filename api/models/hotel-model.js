import mongoose from "mongoose";

const schema = mongoose.Schema;

const hotelSchema = new schema({
    id: {
        type: Number,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true    
    },
    link: {
        type: String,
        require: true
    }
},{timestamps: true})

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel