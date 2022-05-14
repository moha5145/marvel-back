const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    const token = req.headers.authorization;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({ error: "Compte introuvable" });
    } else {
      const salt = user.salt;
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      //   console.log(hash, user.hash);
      if (hash === user.hash) {
        console.log(hash);
        res.json({ token: token, username: user.username, email: email });
      } else {
        res.status(400).json({ error: "le mot de passe ou l'email n'est pas correct" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
