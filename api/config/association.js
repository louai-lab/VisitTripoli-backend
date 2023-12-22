import Tours from "../models/tour";
import User from "../models/user";

User.hasMany(Tours);
Tours.belongsTo(User);

