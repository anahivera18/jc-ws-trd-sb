const express = require('express');
const router = express.Router();
const Game = require('../modelos/Game');

router.get('/', async (req, res) => {
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const games = await Game.find(filter);
  res.json(games);
});

router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

router.post('/', async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.json(newGame);
});

router.put('/:id', async (req, res) => {
  const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedGame);
});

router.delete('/:id', async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ message: 'Juego eliminado' });
});

module.exports = router;
