const mongoose = require("mongoose");

const CharacterFavoris = mongoose.model("CharacterFavoris", {
  name: String,
  description: String,
  thumbnail: Object,
  comics: Array,
  _id: String,
});

module.exports = CharacterFavoris;
