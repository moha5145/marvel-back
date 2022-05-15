const express = require("express");
const router = express.Router();
const Favoris = require("../models/CharacterFavoris ");

router.get("/character/favoris/get", async (req, res) => {
  try {
    const favori = await Favoris.find();
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
