const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ShowTag extends Model {}

ShowTag.init(
  {
    showTagId: {
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
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'tag_id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "show_tags",
    underscored: true,
    modelName: 'showTag'
  }
);

module.exports = ShowTag;