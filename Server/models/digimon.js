"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Digimon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Digimon.hasOne(models.MainDeck, { foreignKey: "DigimonId" });
      Digimon.hasOne(models.EggDeck, { foreignKey: "DigimonId" });
    }
  }
  Digimon.init(
    {
      cardName: DataTypes.STRING,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      color1: DataTypes.STRING,
      color2: DataTypes.STRING,
      stage: DataTypes.STRING,
      attribute: DataTypes.STRING,
      level: DataTypes.INTEGER,
      play_cost: DataTypes.INTEGER,
      evo_cost: DataTypes.INTEGER,
      dp: DataTypes.INTEGER,
      mainEffect: DataTypes.TEXT,
      secondEffect: DataTypes.TEXT,
      digitype: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      setName: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Digimon",
    }
  );
  return Digimon;
};
