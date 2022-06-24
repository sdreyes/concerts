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
        model: 'artists',
        key: 'artist_id',
        unique: false
      }
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
    isHeadliner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    setlist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
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