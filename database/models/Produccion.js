const { Schema, model } = require("mongoose");

const ProduccionSchema = new Schema({
  technology: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Produccion = model("produccion", ProduccionSchema, "produccion");

module.exports = Produccion;
