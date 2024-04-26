const express = require("express");
const MainDeckController = require("../Controllers/MainDeckController");
const authentication = require("../middlewares/authentication");
const mainDeckAuth = require("../middlewares/authMainDeck");
const router = express.Router();

router.get("/", authentication, MainDeckController.getMainDeck);
router.post("/", authentication, MainDeckController.addCardtoDeck);
router.get("/total", authentication, MainDeckController.getTotalDeck);
router.put("/increment/:id", authentication, mainDeckAuth, MainDeckController.incrementDeck);
router.put("/decrement/:id", authentication, mainDeckAuth, MainDeckController.decrementDeck);
router.delete("/:id", authentication, mainDeckAuth, MainDeckController.deleteDeck);

module.exports = router;
