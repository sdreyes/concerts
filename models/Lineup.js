const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Lineup extends Model {}

Lineup.init(
  {
    lineupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artist',
        key: 'artistId',
        unique: false
      }
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'show',
        key: 'showId',
        unique: false
      }
    },
    setlist: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "lineups",
    underscored: true,
    modelName: 'lineup'
  }
);

module.exports = Lineup;