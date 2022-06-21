require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

const Favoris = require("../models/Favoris");

router.get("/comics", async (req, res) => {
  try {
    const { title, skip } = req.query;
    // console.log(req.query);
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&skip=${skip}`);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  console.log(req.params.characterId);
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${apiKey}`);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/comics/favoris/post", async (req, res) => {
  try {
    // console.log(req.fields);
    const favoris = await new Favoris(req.fields);

    await favoris.save();

    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comics/favoris/get", async (req, res) => {
  try {
    const favori = await Favoris.find();
    // console.log(favori);
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/comics/favoris/delete", async (req, res) => {
  try {
    const { _id } = req.fields;
    const favori = await Favoris.findByIdAndDelete(_id);
    // console.log(favori);
    res.json(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
