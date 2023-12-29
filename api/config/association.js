import Tours from "../models/tour.js"
import User from "../models/user.js"
import Hotel from "../models/hotel.js"
import Request from "../models/request.js"
import Location from '../models/location.js'
import tourLocation from "../models/tourlocation.js"

User.hasMany(Tours, {
    foreignKey: 'userId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Tours.belongsTo(User);

Tours.hasMany(Request, {
    foreignKey: 'tourId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Request.belongsTo(Tours)

User.hasMany(Hotel, {
    foreignKey: 'userId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Hotel.belongsTo(User)

Tours.hasMany(tourLocation, {
    foreignKey: 'tourId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

tourLocation.belongsTo(Tours)

Location.hasMany(tourLocation, {
    foreignKey: 'locationId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

tourLocation.belongsTo(Location)