

const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
    description: String,
    name: String,
    age: String,
    species: String,
    breed: String,
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