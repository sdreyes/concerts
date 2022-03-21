const router = require('express').Router();
const { Artist } = require('../../models');

// GET all artists
router.get('/', async (req, res) => {
  try {
    const artistData = await Artist.findAll({
      order: ['artist']
    });
    res.status(200).json(artistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an artist
if (process.env.NODE_ENV !== "production") {
  router.post('/', async (req, res) => {
    try {
      const artistData = await Artist.create(req.body);
      res.status(200).json(artistData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = router;