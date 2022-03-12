const router = require('express').Router();
const { Venue } = require('../../models');

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venueData = await Venue.findAll({
      order: ['venue']
    });
    res.status(200).json(venueData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a venue
router.post('/', async (req, res) => {
  try {
    const venueData = await Venue.create(req.body);
    res.status(200).json(venueData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;