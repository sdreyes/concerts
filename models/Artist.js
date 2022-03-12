const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
  {
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "artists",
    underscored: true,
    modelName: 'artist'
  }
);

module.exports = Artist;