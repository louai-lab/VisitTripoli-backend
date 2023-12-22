import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const User = sequelize.define(
  "User",
  {
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    role:{
      type: DataTypes.ENUM('admin', 'guide'),
      defaultValue: 'guide',
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }
)

export default User