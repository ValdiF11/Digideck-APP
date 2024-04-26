const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
class UsersController {
  static async addUser(req, res, next) {
    try {
      const { email, password, username } = req.body;
      console.log(email, password, username);
      await User.create({ email, password, username });
      let data = await User.findOne({ where: { email }, attributes: { exclude: ["password"] } });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;
      if ((!email && !username) || !password) {
        throw { name: "invalid input" };
      }

      let user;
      if (email) {
        user = await User.findOne({ where: { email } });
      } else if (username) {
        user = await User.findOne({ where: { username } });
      }

      if (!user) {
        throw { name: "invalid user" };
      }

      let compare = comparePassword(password, user.password);

      if (!compare) {
        throw { name: "invalid user" };
      }

      let token = createToken({ id: user.id });

      res.status(200).json({ acces_token: token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: (Math.random() * 10000).toString(),
        },
      });
      console.log(user, created);
      let token = createToken({ id: user.id });
      res.status(200).json({ acces_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UsersController;
