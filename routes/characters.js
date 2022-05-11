require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;