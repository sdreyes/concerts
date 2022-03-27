const router = require('express').Router();
const { Lineup } = require('../../models');

// GET all lineups
// This is not necessary, this is just a placeholder
router.get('/', async (req, res) => {
  try {
    const lineupData = await Lineup.findAll();
    res.status(200).json(lineupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a lineup
if (process.env.NODE_ENV !== "production") {
  router.post('/', async (req, res) => {
    try {
      const lineupData = await Lineup.bulkCreate(req.body);
      res.status(200).json(lineupData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = router;