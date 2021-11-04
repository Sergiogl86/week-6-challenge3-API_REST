const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("week6:Desarroyo");
const Desarroyo = require("../../database/models/Desarroyo");

const router = express.Router();

router.get("/", async (req, res) => {
  const technology = await Desarroyo.find();
  debug(chalk.red("Haciendo el get a /"));
  res.json(technology);
});

module.exports = router;
