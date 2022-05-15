const express = require("express");
const router = express.Router();
const CharacterFavoris = require("../models/CharacterFavoris ");

router.post("/caractair/favoris/post", async (req, res) => {
  try {
    // console.log(req.fields);
    const { name, description, thumbnail, _id, comics } = req.fields;

    const favori = await new CharacterFavoris({
      name: name,
      description: description,
      thumbnail: thumbnail,
      comics: comics,
      _id: _id,
    });
    console.log(favori);
    await favori.save();
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
