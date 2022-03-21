const router = require('express').Router();
const { Attendee } = require('../../models');

// GET all attendees
router.get('/', async (req, res) => {
  try {
    const attendeeData = await Attendee.findAll({
      order: ['name']
    });
    res.status(200).json(attendeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an attendee
if (process.env.NODE_ENV !== "production") {
  router.post('/', async (req, res) => {
    try {
      const attendeeData = await Attendee.create(req.body);
      res.status(200).json(attendeeData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = router;