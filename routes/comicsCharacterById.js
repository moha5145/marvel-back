require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

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

module.exports = router;