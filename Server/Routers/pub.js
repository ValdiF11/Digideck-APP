const express = require("express");
const PublicController = require("../Controllers/PublicController");
const router = express.Router();

router.get("/digimon", PublicController.getAllDigimon);
router.get("/digimon/:id", PublicController.getDigimonById);

module.exports = router;
