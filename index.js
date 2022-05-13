const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

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

const characterCharacterById = require("./routes/characterCharacterById");
app.use(characterCharacterById);
app.get("*", (req, res) => {
  res.status(400).json({ error: "Page not find" });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`serveur listening port: ${port} ...`);
});
