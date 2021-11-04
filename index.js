require("dotenv").config();
const inquirer = require("inquirer");
require("./database/index");

const { initializeServer, selectBD } = require("./server/index");

(async () => {
  const answers = await inquirer.prompt([
    {
      name: "port",
      type: "number",
      message: "¿Numero de puerto?",
      default: 4000,
    },
    {
      name: "baseDatos",
      type: "list",
      message: "¿Cual base de datos quieres usar?",
      choices: [
        {
          name: "Pruebas",
          value: "desarroyos",
        },
        {
          name: "Producción",
          value: "produccion",
        },
      ],
      default: "desarroyos",
    },
    {
      name: "permisos",
      type: "confirm",
      message:
        "¿Quieres permitir que los clientes puedan crear, borrar y modificar?",
      default: false,
    },
  ]);
  console.log(answers);
  const port = answers.port || process.env.CALCULADORA_EXPRESS || 5000;
  initializeServer(port);
  selectBD(answers.baseDatos, answers.permisos);
})();
