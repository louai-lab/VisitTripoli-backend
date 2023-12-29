import { Sequelize } from "sequelize"
import 'dotenv/config'
import Hotel from './hotel.js'
import Request from "./request.js"
import Tours from "./tour.js"
import User from "./user.js"
import Location from './location.js'
import TourLocation from './tourlocation.js'

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
      host: process.env.DB_HOST,
      dialect: 'mysql'
  }
)

const userModel = new User(sequelize, Sequelize)
const tourModel = new Tours(sequelize, Sequelize)
const requestModel = new Request(sequelize, Sequelize)
const hotelModel = new Hotel(sequelize, Sequelize)
const locationModel = new Location(sequelize, Sequelize)
const tourLocationModel = new TourLocation(sequelize, Sequelize)

const db = {
  sequelize,
  Sequelize,
  userModel,
  tourModel,
  requestModel,
  hotelModel,
  locationModel,
  tourLocationModel
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db