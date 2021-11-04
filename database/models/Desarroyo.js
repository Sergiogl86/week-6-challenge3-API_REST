const { Schema, model } = require("mongoose");

const petSchema = new Schema({
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

const Desarroyo = model("Desarroyo", petSchema, "Desarroyo");

module.exports = Desarroyo;
