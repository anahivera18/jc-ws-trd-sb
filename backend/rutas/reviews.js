
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewsController');

router.get('/:gameId', ctrl.listByGame);
router.post('/:gameId', ctrl.create);
router.put('/review/:id', ctrl.update);
router.delete('/review/:id', ctrl.remove);

module.exports = router;
