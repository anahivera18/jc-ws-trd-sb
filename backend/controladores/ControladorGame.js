
const Game = require('./modelos/game');
const Review = require('./modelos/Review');

exports.list = async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = q ? { title: new RegExp(q, 'i') } : {};
    const games = await Game.find(filter).sort({ createdAt: -1 });
    res.json(games);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ msg: 'Juego no encontrado' });
    res.json(game);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const g = new Game(req.body);
    await g.save();
    res.status(201).json(g);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ msg: 'Juego no encontrado' });
    res.json(game);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Review.deleteMany({ game: req.params.id });
    await Game.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.stats = async (req, res) => {
  try {
    const totalGames = await Game.countDocuments();
    const completed = await Game.countDocuments({ status: 'completado' });
    const hoursAgg = await Game.aggregate([{ $group: { _id: null, total: { $sum: "$hoursPlayed" }}}]);
    const hours = hoursAgg[0]?.total || 0;
    const avgAgg = await Game.aggregate([{ $group: { _id: null, avg: { $avg: "$rating" }}}]);
    const avgRating = avgAgg[0]?.avg || 0;
    res.json({ totalGames, completed, hours, avgRating: Number(avgRating.toFixed(2)) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
