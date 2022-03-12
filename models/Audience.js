const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Audience extends Model {}

Audience.init(
  {
    audienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shows',
        key: 'show_id',
        unique: false
      }
    },
    attendeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attendees',
        key: 'attendee_id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "audiences",
    underscored: true,
    modelName: 'audience'
  }
);

module.exports = Audience;