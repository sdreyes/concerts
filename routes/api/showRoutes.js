const router = require('express').Router();
const { Show, Attendee, Audience } = require('../../models');

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

// GET show info by show ID
router.get('/:showId', async (req, res) => {
  try {
    const showData = await Show.findByPk(req.params.showId, {
      include: [
        {
          model: Attendee,
          through: {
            Audience,
            attributes: []
          },
          as: 'attendees'
        }
      ]
    });
    res.status(200).json(showData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a show
router.post('/', async (req, res) => {
  try {
    const showData = await Show.create(req.body);
    res.status(200).json(showData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;