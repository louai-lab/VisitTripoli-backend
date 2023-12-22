import { DataTypes, Sequelize } from "sequelize"
import sequelize from "../config/dbConnection.js"

const Request = sequelize.define(
  'Request',
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    visitorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitorEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitorPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

export default Request