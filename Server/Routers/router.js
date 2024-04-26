const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const UsersController = require("../Controllers/UserController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.post("/add-user", UsersController.addUser);
router.post("/login", UsersController.login);
router.post("/google-login", UsersController.googleLogin);
router.use("/pub", require("./pub"));
router.use("/mainDeck", require("./mainDeck"));
router.use("/eggDeck", require("./eggDeck"));

module.exports = router;
