"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MainDeck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MainDeck.belongsTo(models.User, { foreignKey: "UserId" });
      MainDeck.belongsTo(models.Digimon, { foreignKey: "DigimonId" });
    }
  }
  MainDeck.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
      DigimonId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Digimons",
          key: "id",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "DigimonId is required",
          },
          notNull: {
            msg: "DigimonId is required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          max: {
            args: 4,
            msg: "Maximum 4 same card in deck",
          },
          min: {
            args: 1,
            msg: "Minimum card in deck is one, please delete the card",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "MainDeck",
    }
  );
  return MainDeck;
};
