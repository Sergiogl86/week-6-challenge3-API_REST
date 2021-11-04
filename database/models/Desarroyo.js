const { Schema, model } = require("mongoose");

const DesarroyoSchema = new Schema({
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

const Desarroyo = model("Desarroyo", DesarroyoSchema, "Desarroyo");

module.exports = Desarroyo;
