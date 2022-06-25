require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

const CharacterFavoris = require("../models/CharacterFavoris ");
const User = require("../models/User");

router.get("/characters", async (req, res) => {
  try {
    const { name, skip } = req.query;
    // console.log(req.query);
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&skip=${skip}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/caractair/favoris/create", async (req, res) => {
  try {
    // console.log(req.fields);
    const { name, description, thumbnail, userId, comics, characterId } = req.fields;

    const user = await User.findById(userId);

    const favori = await new CharacterFavoris({
      name: name,
      description: description,
      thumbnail: thumbnail,
      comics: comics,
      user: user._id,
      characterId: characterId,
    });
    await favori.save();
    console.log(favori);
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/character/favoris/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favori = await CharacterFavoris.find({ user: userId });
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/character/favoris/delete", async (req, res) => {
  try {
    const { _id, userId } = req.fields;
    console.log(req.fields);
    const favori = await CharacterFavoris.deleteOne({ userId: userId, characterId: _id });
    // console.log(favori);
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
