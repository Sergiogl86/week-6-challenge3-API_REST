require("dotenv").config();
/* const inquirer = require("inquirer"); */
require("./database/index");

const initializeServer = require("./server/index");

const port = process.env.CALCULADORA_EXPRESS || 5000;

initializeServer(port);
