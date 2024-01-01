import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConnection.js";

const location = sequelize.define("location", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default location;
