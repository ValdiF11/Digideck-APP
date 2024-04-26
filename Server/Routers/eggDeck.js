const express = require("express");
const authentication = require("../middlewares/authentication");
const EggDeckController = require("../Controllers/EggDeckController");
const eggDeckAuth = require("../middlewares/authEggDeck");
const router = express.Router();

router.get("/", authentication, EggDeckController.getEggDeck);
router.post("/", authentication, EggDeckController.addCardtoDeck);
router.get("/total", authentication, EggDeckController.getTotalDeck);
router.put("/increment/:id", authentication, eggDeckAuth, EggDeckController.incrementDeck);
router.put("/decrement/:id", authentication, eggDeckAuth, EggDeckController.decrementDeck);
router.delete("/:id", authentication, eggDeckAuth, EggDeckController.deleteDeck);

module.exports = router;
