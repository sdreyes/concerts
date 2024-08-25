const router = require('express').Router();
const { Show, Attendee, Audience, Artist, Lineup, Venue } = require('../../models');
const { Op } = require("sequelize");

// GET all shows with no filters
router.get('/', async (req, res) => {
  try {
    const showData = await Show.findAll({
      order: [
        ['startDate', 'DESC']
      ],
      attributes: ['showId', 'title', 'startDate', 'endDate', 'notes'],
      include: [
        {
          model: Attendee,
          through: {
            Audience,
            attributes: []
          },
          as: 'attendees',
          required: false
        },
        {
          model: Artist,
          through: {
            Lineup,
            attributes: ['isHeadliner', 'setlist'],
          },
          as: 'artistLineup',
          required: false
        },
        {
          model: Venue,
          as: 'location',
          required: false
        }
      ]
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
      attributes: ['showId', 'title', 'startDate', 'endDate', 'notes'],
      order: [
        // Sort by AttendeeId
        [
          {
            model: Attendee, 
            as: 'attendees'
          },
          'attendeeId', 
          'ASC'
        ],
        // Sort by the order the artist played (openers first)
        [
          {
            model: Artist, 
            as: 'artistLineup'
          },
          Lineup,
          'sortOrder', 
          'ASC'
        ]
      ],
      include: [
        {
          model: Attendee,
          through: {
            Audience,
            attributes: []
          },
          as: 'attendees'
        },
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
      ]
    });
    console.log("data")
    console.log(showData);
    res.status(200).json(showData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST (get) all shows with filters
router.post('/filter', async (req, res) => {
  try {
    const showData = await Show.findAll({
      order: [
        ['startDate', 'DESC']
      ],
      attributes: ['showId', 'title', 'startDate', 'endDate', 'notes'],
      include: [
        {
          model: Attendee,
          through: {
            Audience,
            attributes: []
          },
          as: 'attendees'
        },
        {
          model: Artist,
          through: {
            Lineup,
            attributes: ['isHeadliner', 'setlist'],
          },
          as: 'artistLineup',
          where: {
            artistId: {
              [Op.or]: req.body.artistFilters
            }
          }
        },
        {
          model: Venue,
          as: 'location'
        }
      ]
    });
    console.log(showData);
    res.status(200).json(showData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a show
if (process.env.NODE_ENV !== "production") {
  router.post('/', async (req, res) => {
    try {
      const showData = await Show.create(req.body);
      res.status(200).json(showData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = router;