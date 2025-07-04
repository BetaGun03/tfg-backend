const { DataTypes, Model } = require('sequelize')
const sequelize = require("../db/sequelizeConnection")

// Define the Rating model of the database for the ORM
class Rating extends Model{
    toJSON(){
        const values = { ...this.get() }
        delete values.user_id
        delete values.rating_date
        return values
    }
}

Rating.init( 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rating:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        rating_date:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
},
{
    sequelize,
    modelName: "Rating",
    tableName: "RATING",
    timestamps: false
})

module.exports = Rating