const express = require("express");
const router = express.Router();
const Favoris = require("../models/Favoris");

router.get("/comics/favoris/get", async (req, res) => {
  try {
    const favori = await Favoris.find();
    // console.log(favori);
    res.json(favori);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
