const router = require('express').Router();
const { Audience } = require('../../models');

// GET all audiences
// This is not necessary, this is just a placeholder
router.get('/', async (req, res) => {
  try {
    const audienceData = await Audience.findAll();
    res.status(200).json(audienceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an audience
if (process.env.NODE_ENV !== "production") {
  router.post('/', async (req, res) => {
    try {
      const audienceData = await Audience.bulkCreate(req.body);
      res.status(200).json(audienceData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = router;