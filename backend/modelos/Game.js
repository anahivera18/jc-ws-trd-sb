const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: String,
  completed: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  hoursPlayed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', gameSchema);
