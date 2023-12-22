import { DataTypes, Sequelize } from "sequelize"
import sequelize from "../config/dbConnection.js"

const Hotel = sequelize.define(
  'Hotel',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }
)

export default Hotel