const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("week6:Desarroyo");
const Desarroyo = require("../../database/models/Desarroyo");

/* const app = express(); */

const DesarroyoServer = (edit, app) => {
  console.log("DesarroyoServer");
  console.log(edit);
  app.get("/", async (req, res) => {
    const technology = await Desarroyo.find();
    debug(chalk.red("Haciendo el get a /"));
    res.json(technology);
  });

  app.get("/:name", async (req, res) => {
    const nameTechnology = req.params.name;
    debug(chalk.red(`Haciendo el buscando a /${nameTechnology}`));
    const technology = await Desarroyo.findOne({
      technology: nameTechnology,
    });
    res.json(technology);
  });
  if (edit) {
    app.post(
      "/",
      (req, res, next) => {
        console.log("Creando una tecnologia!");
        next();
      },
      async (req, res, next) => {
        try {
          debug(chalk.red("Haciendo el post a /"));
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

    app.put(
      "/",
      (req, res, next) => {
        console.log("Creando una tecnologia!");
        next();
      },
      async (req, res, next) => {
        try {
          debug(chalk.red("Haciendo el put a /"));
          const technology = req.body;
          debug(chalk.red(technology._id));
          await Desarroyo.findByIdAndUpdate(technology._id, technology);
          res.json(technology);
        } catch (error) {
          error.code = 400;
          error.message = "Datos erroneos!";
          next(error);
        }
      }
    );

    app.delete(
      "/:name",
      (req, res, next) => {
        console.log("Borrando una tecnologia!");
        next();
      },
      async (req, res, next) => {
        try {
          const nameTechnology = req.params.name;
          debug(chalk.red(`Haciendo el delete a /${nameTechnology}`));
          debug(chalk.red(nameTechnology));
          const technology = await Desarroyo.deleteOne({
            technology: nameTechnology,
          });
          res.json(technology);
        } catch (error) {
          error.code = 400;
          error.message = "Datos erroneos!";
          next(error);
        }
      }
    );
  }
};

module.exports = { DesarroyoServer };
