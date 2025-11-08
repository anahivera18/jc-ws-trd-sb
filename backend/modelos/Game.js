
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  genre: { type: String },
  platform: { type: String },
  year: { type: Number },
  hoursPlayed: { type: Number, default: 0 },
  imageUrl: { type: String },
  status: { type: String, enum: ['completado','en-progreso'], default: 'en-progreso' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
