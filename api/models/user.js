// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     name: DataTypes.STRING,
//     role: DataTypes.ENUM('guide', 'admin'),
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

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