import mongoose from "mongoose";

const schema = mongoose.Schema;

const hotelSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true    
    },
    link: {
        type: String,
        required: true
    }
},{timestamps: true})

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel