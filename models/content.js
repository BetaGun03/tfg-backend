const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require("../db/sequelizeConnection")

// Defines the Content model of the database for the ORM
class Content extends Model {
    toJSON() {
        const values = { ...this.get() }
        delete values.creation_date
        return values
    }
}

Content.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        type:{
            type: DataTypes.ENUM('movie', 'series'),
            allowNull: false,
            defaultValue: 'movie'
        },
        synopsis:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        poster:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        trailer_url:{
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                isUrl: true
            }
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull: true,
            validate:{
                isDate: true
            }
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        creation_date:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        genre:{
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        },
        keywords:{
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        },
        poster_mime:{
            type: DataTypes.STRING,
            allowNull: false
        }
},
{
    sequelize,
    modelName: "Content",
    tableName: "CONTENT",
    timestamps: false
})

module.exports = Content