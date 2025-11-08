const Review = require('../modelos/Review');

const listByGame = async (req, res) => {
   try {  
     const reviews = await Review.find({ game: req.params.gameId }).sort({ createdAt: -1 });
     res.json(reviews);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
    try {
    const r = new Review({ ...req.body, game: req.params.gameId });
    await r.save();
    res.status(201).json(r);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

const update = async (req, res) => {
  try {
   const r = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });  
    if (!r) return res.status(404).json({ msg: 'Reseña no encontrada' });
    res.json(r);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
   await Review.findByIdAndDelete(req.params.id); 
   res.json({ msg: 'Reseña eliminada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = {
    listByGame,
    create,
    update,
    remove
};