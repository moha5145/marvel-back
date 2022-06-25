const mongoose = require("mongoose");

const ComicFavoris = mongoose.model("ComicFavoris", {
  title: String,
  description: String,
  thumbnail: Object,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comicId: String,
});

module.exports = ComicFavoris;
