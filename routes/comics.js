require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

const ComicFavoris = require("../models/ComicsFavoris");
const User = require("../models/User");

router.get("/comics", async (req, res) => {
  try {
    const { title, skip } = req.query;
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&skip=${skip}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  console.log(req.params.characterId);
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/comics/favoris/create", async (req, res) => {
  try {
    console.log(req.fields);
    const { title, description, thumbnail, userId, comicId } = req.fields;

    const user = await User.findById(userId);
    console.log(userId);
    const favoris = await new ComicFavoris({
      title,
      description,
      thumbnail,
      comicId,
      user: user._id,
    });
    await favoris.save();
    console.log(favoris);

    res.json(favoris);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comics/favoris/:userId", async (req, res) => {
  try {
    let filter = {};
    const userId = req.params.userId;
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    if (userId) {
      filter.user = userId;
    }
    const favori = await ComicFavoris.find(filter);

    console.log(favori);
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/comics/favoris/delete", async (req, res) => {
  try {
    const { _id, userId } = req.fields;
    const favori = await ComicFavoris.deleteOne({ comicId: _id, user: userId });
    console.log(_id, userId);
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
