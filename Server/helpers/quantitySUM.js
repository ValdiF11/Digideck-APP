const { MainDeck, EggDeck } = require("../models");

async function getTotalQuantityMain(id) {
  try {
    const result = await MainDeck.sum("quantity", {
      where: { UserId: id },
    });
    return result || 0;
  } catch (error) {
    throw { name: "Database Error" };
  }
}
async function getTotalQuantityEgg(id) {
  try {
    const result = await EggDeck.sum("quantity", {
      where: { UserId: id },
    });
    return result || 0;
  } catch (error) {
    throw { name: "Database Error" };
  }
}

module.exports = { getTotalQuantityMain, getTotalQuantityEgg };
