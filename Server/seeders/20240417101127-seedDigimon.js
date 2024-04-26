"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // get starter deck red
    const responseRed = await axios.get("https://digimoncard.io/api-public/search.php?pack=ST-1: Starter Deck Gaia Red&series=Digimon Card Game");
    const red = responseRed.data;
    // get starter deck blue
    const responseBlue = await axios.get(
      "https://digimoncard.io/api-public/search.php?pack=ST-2: Starter Deck Cocytus Blue&series=Digimon Card Game"
    );
    const blue = responseBlue.data;
    // get starter deck yellow
    const responseYellow = await axios.get(
      " https://digimoncard.io/api-public/search.php?pack=ST-3: Starter Deck Heaven's Yellow&series=Digimon Card Game"
    );
    const yellow = responseYellow.data;
    // combine all data
    const combinedData = [...red, ...blue, ...yellow];
    // mapping
    const data = combinedData.map((item) => ({
      cardName: item.cardnumber + " " + item.name,
      name: item.name,
      type: item.type,
      color1: item.color,
      stage: item.stage,
      attribute: item.attribute,
      level: item.level,
      play_cost: item.play_cost,
      evo_cost: item.evolution_cost,
      dp: item.dp,
      mainEffect: item.maineffect,
      secondEffect: item.soureeffect,
      digitype: item.digi_type,
      cardNumber: item.cardnumber,
      setName: item.set_name,
      imgUrl: item.image_url,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    console.log(data);
    await queryInterface.bulkInsert("Digimons", data, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Digimons", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
