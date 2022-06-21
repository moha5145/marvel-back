require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

const CharacterFavoris = require("../models/CharacterFavoris ");

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

router.get("/character/favoris/get", async (req, res) => {
  try {
    const favori = await CharacterFavoris.find();
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
