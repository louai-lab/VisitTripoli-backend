import { DataTypes, Sequelize } from "sequelize"
import sequelize from "../config/dbConnection.js"

const tourLocation = sequelize.define(
'location',
{
tourId: {
type: DataTypes.INTEGER,
allowNull: false
},
locationId: {
type: DataTypes.INTEGER,
allowNull: false
}
}
)

export default tourLocation