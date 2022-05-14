const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.get("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.fields;

    if (!username) {
      res.json({ error: "Nom d'utilisateur est nécessaire" });
    } else {
      const isEmailExist = User.findOne({ email: email });
      if (isEmailExist == null) {
        res.json({ error: "L'e-mail existe déjà" });
      } else {
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = await new User({
          username: username,
          email: email,
          password: password,
          token: token,
          hash: hash,
          salt: salt,
        });
        await newUser.save();

        const result = await User.findById(newUser._id).select("username email token");
        console.log(result);
        res.json(result);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
