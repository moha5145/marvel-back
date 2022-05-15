const express = require("express");
const router = express.Router();

const Favoris = require("../models/Favoris");

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

module.exports = router;
