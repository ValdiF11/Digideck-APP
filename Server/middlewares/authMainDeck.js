const { MainDeck } = require("../models");

const mainDeckAuth = async (req, res, next) => {
  try {
    let main = await MainDeck.findByPk(req.params.id);
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

module.exports = mainDeckAuth;
