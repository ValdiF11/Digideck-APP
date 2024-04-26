"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Digimons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cardName: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      color1: {
        type: Sequelize.STRING,
      },
      color2: {
        type: Sequelize.STRING,
      },
      stage: {
        type: Sequelize.STRING,
      },
      attribute: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.INTEGER,
      },
      play_cost: {
        type: Sequelize.INTEGER,
      },
      evo_cost: {
        type: Sequelize.INTEGER,
      },
      dp: {
        type: Sequelize.INTEGER,
      },
      mainEffect: {
        type: Sequelize.TEXT,
      },
      secondEffect: {
        type: Sequelize.TEXT,
      },
      digitype: {
        type: Sequelize.STRING,
      },
      cardNumber: {
        type: Sequelize.STRING,
      },
      setName: {
        type: Sequelize.STRING,
      },
      imgUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Digimons");
  },
};
