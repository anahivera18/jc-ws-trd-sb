
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  author: { type: String, default: 'Anónimo' },
  stars: { type: Number, min: 0, max: 5, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
