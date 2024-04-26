const { EggDeck } = require("../models");

const eggDeckAuth = async (req, res, next) => {
  try {
    let main = await EggDeck.findByPk(req.params.id);
    if (!main) {
      throw { name: "NotFound" };
    }
    if (main.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = eggDeckAuth;
