const chalk = require("chalk");
const debug = require("debug")("week6:server");
const express = require("express");
const morgan = require("morgan");
const { DesarroyoServer } = require("./routes/DesarroyoRoutes");
const { ProduccionServer } = require("./routes/ProduccionRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está en uso.`));
    }
  });
};

const selectBD = (baseDatos, edit) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use((req, res, next) => {
    debug("Soy el segundo middleware");
    next();
  });
  if (baseDatos === "desarroyos") {
    DesarroyoServer(edit, app);
  } else if (baseDatos === "produccion") {
    ProduccionServer(edit, app);
  }

  app.use(notFoundErrorHandler);
  app.use(generalErrorHandler);
};

module.exports = { initializeServer, selectBD };
