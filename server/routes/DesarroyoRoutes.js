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

router.post(
  "/nuevo",
  (req, res, next) => {
    console.log("Creando una tecnologia!");
    next();
  },
  async (req, res, next) => {
    try {
      const technology = req.body;
      const newtechnology = await Desarroyo.create(technology);
      res.json(newtechnology);
    } catch (error) {
      error.code = 400;
      error.message = "Datos erroneos!";
      next(error);
    }
  }
);

module.exports = router;
