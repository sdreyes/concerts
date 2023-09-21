const router = require('express').Router();
const Sequelize = require('sequelize');
const { Show, Attendee, Audience, Artist, Lineup, Venue } = require('../../models');

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

/* Shows by year for attendee ID */
router.get('/showsbyyear/:attendeeId', async (req, res) => {
  try {
    const showsbyyear = await Show.findAll({
      attributes: [
          [Sequelize.literal(`YEAR(start_date)`), 'year'],
          [Sequelize.literal(`COUNT(*)`), 'show_count']
      ],
      include: [
        {
          model: Attendee,
          attributes: [],
          through: {
            Audience,
            attributes: []
          },
          as: 'attendees',
          where: {'attendee_id': req.params.attendeeId},
        }
      ],
      order: [
        Sequelize.literal(`YEAR(start_date) DESC`)
      ],
      group: [Sequelize.literal(`YEAR(start_date)`)]
    });
    console.log("data")
    console.log(showsbyyear);
    res.status(200).json(showsbyyear);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET attendee info by attendee ID
router.get('/:attendeeId', async (req, res) => {
  try {
    const attendeeData = await Attendee.findByPk(req.params.attendeeId, {
      attributes: ['attendeeId', 'name', 'notes'],
      order: [
        // Sort by AttendeeId
        [
          {
            model: Show, 
            as: 'shows'
          },
          'startDate', 
          'DESC'
        ]
      ],
      include: [
        {
          model: Show,
          through: {
            Audience,
            attributes: []
          },
          include: [
            {
              model: Artist,
              through: {
                Lineup,
                attributes: ['isHeadliner', 'setlist']
              },
              as: 'artistLineup'
            },
            {
              model: Venue,
              as: 'location'
            }
          ],
          as: 'shows'
        }
      ]
    });
    console.log("data")
    console.log(attendeeData);
    res.status(200).json(attendeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;