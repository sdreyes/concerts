const router = require('express').Router();
const { Show } = require('../../models');

// GET all shows
router.get('/', async (req, res) => {
  try {
    const showData = await Show.findAll({
      order: ['title']
    });
    res.status(200).json(showData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an shows
router.post('/', async (req, res) => {
  try {
    const showData = await Show.create(req.body);
    res.status(200).json(showData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;