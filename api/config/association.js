import Tours from "../models/tour";
import User from "../models/user";
import Hotel from "../models/hotel";
import Request from "../models/request";

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