import User from "../models/user";
import Tour from "../models/tour";

User.hasMany(Tour);
Tour.belongsTo(User);