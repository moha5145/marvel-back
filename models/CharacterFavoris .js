const mongoose = require("mongoose");

const CharacterFavoris = mongoose.model("CharacterFavoris", {
  name: String,
  description: String,
  thumbnail: Object,
  comics: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  characterId: String,
});

module.exports = CharacterFavoris;
