const express = require("express");
const router = express.Router();
const CharacterFavoris = require("../models/CharacterFavoris ");

router.post("/character/favoris/delete", async (req, res) => {
  try {
    const { _id } = req.fields;
    console.log(_id);
    const favori = await CharacterFavoris.findByIdAndDelete(_id);
    // console.log(favori);
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
