require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

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

module.exports = router;
