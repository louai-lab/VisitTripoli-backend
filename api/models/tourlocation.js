import { DataTypes, Sequelize } from "sequelize"
import sequelize from "../config/dbConnection.js"

const tourLocation = sequelize.define(
'Tourlocations',
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