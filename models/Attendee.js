const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attendee extends Model {}

Attendee.init(
  {
    attendeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
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
    tableName: "attendees",
    underscored: true,
    modelName: 'attendee'
  }
);

module.exports = Attendee;