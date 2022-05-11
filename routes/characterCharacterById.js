require("dotenv").config();
const axios = require("axios");
const express = require("express");

const router = express.Router();

const apiKey = process.env.API_KEY;

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
