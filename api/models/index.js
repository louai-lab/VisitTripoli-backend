import { Sequelize } from "sequelize"
import 'dotenv/config'
import Hotel from './hotel.js'
import Request from "./request.js"
import Tours from "./tour.js"
import User from "./user.js"

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
      host: process.env.DB_HOST,
      dialect: 'mysql'
  }
)

const userModel = User(sequelize, Sequelize)
const tourModel = Tours(sequelize, Sequelize)
const requestModel = Request(sequelize, Sequelize)
const hotelModel = Hotel(sequelize, Sequelize)

const db = {
  sequelize,
  Sequelize,
  userModel,
  tourModel,
  requestModel,
  hotelModel
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db