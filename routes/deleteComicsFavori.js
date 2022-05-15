const express = require("express");
const router = express.Router();
const Favoris = require("../models/Favoris");

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
