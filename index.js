require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/marvel");
mongoose.connect(process.env.MONGOOSE_CONNECT);

const app = express();

app.use(cors());
app.use(formidable());
const apiKey = process.env.API_KEY;

const comics = require("./routes/comics");
app.use(comics);

const comicsCharacterById = require("./routes/comicsCharacterById");
app.use(comicsCharacterById);

const characters = require("./routes/characters");
app.use(characters);

const character = require("./routes/character");
app.use(character);

const signUp = require("./routes/signUp");
app.use(signUp);

const login = require("./routes/login");
app.use(login);

app.get("*", (req, res) => {
  res.status(400).json({ error: "Page not find" });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`serveur listening port: ${port} ...`);
});
