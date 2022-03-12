const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

Venue.init(
  {
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "venues",
    underscored: true,
    modelName: 'venue'
  }
);

module.exports = Venue;