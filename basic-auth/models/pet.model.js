

const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
    name: String,
    species: String,
    feeding: String,
    environment: String,
    imageUrl: String,
    owner: {type: Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true
  }
);

module.exports = model('Pet', petSchema);