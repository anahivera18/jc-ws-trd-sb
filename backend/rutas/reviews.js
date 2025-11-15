const express = require('express');
const router = express.Router();
const Review = require('../modelos/Review');

router.get('/:gameId', async (req, res) => {
  const reviews = await Review.find({ game: req.params.gameId });
  res.json(reviews);
});

router.post('/:gameId', async (req, res) => {
  const newReview = new Review({ ...req.body, game: req.params.gameId });
  await newReview.save();
  res.json(newReview);
});

router.put('/review/:id', async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedReview);
});

router.delete('/review/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Reseña eliminada' });
});

module.exports = router;
