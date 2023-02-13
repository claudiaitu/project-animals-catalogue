

const { Schema, model } = require('mongoose');

const addSchema = new Schema(
  {
    name: String,
    species: String,
    feeding: String,
    environment: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('Add', addSchema);