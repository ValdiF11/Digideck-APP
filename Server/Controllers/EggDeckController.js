const { Op } = require("sequelize");
const { getTotalQuantityMain, getTotalQuantityEgg } = require("../helpers/quantitySUM");
const { EggDeck, Digimon, User } = require("../models");

class EggDeckController {
  static async addCardtoDeck(req, res, next) {
    try {
      const { DigimonId } = req.body;
      const total = await getTotalQuantityEgg(req.user.id);
      if (total >= 5) {
        throw { name: "Add Card Error" };
      }
      const card = await EggDeck.findOne({
        where: { [Op.and]: [{ UserId: req.user.id }, { DigimonId }] },
      });
      if (card) {
        throw { name: "Add Card Error" };
      }
      const data = await EggDeck.create({ UserId: req.user.id, DigimonId });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTotalDeck(req, res, next) {
    try {
      const total = await getTotalQuantityEgg(req.user.id);
      res.status(200).json({ totalDeck: total });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async incrementDeck(req, res, next) {
    try {
      const input = req.params.id;
      const card = await EggDeck.findByPk(input);
      if (!card) {
        throw { name: "NotFound" };
      }
      if (card.quantity >= 4) {
        throw { name: "Increment Error" };
      }
      await card.increment("quantity");
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async decrementDeck(req, res, next) {
    try {
      const input = req.params.id;
      const card = await EggDeck.findByPk(input);
      if (!card) {
        throw { name: "NotFound" };
      }
      if (card.quantity <= 1) {
        throw { name: "Decrement Error" };
      }
      await card.decrement("quantity");
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteDeck(req, res, next) {
    try {
      const input = req.params.id;
      const card = await EggDeck.findByPk(input);
      if (!card) {
        throw { name: "NotFound" };
      }
      await card.destroy();
      res.status(200).json({ message: `Card with id: ${card.DigimonId} successfully deleted` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getEggDeck(req, res, next) {
    try {
      const card = await EggDeck.findAll({
        where: { UserId: req.user.id },
        include: {
          model: Digimon,
          attributes: ["cardName", "imgUrl"],
        },
      });
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = EggDeckController;
