const router = require('express').Router();
const artistRoutes = require('./artistRoutes');
const venueRoutes = require('./venueRoutes');
const attendeeRoutes = require('./attendeeRoutes');
const showRoutes = require('./showRoutes');
const audienceRoutes = require('./audienceRoutes');
const lineupRoutes = require('./lineupRoutes');

router.use('/artists', artistRoutes);
router.use('/venues', venueRoutes);
router.use('/attendees', attendeeRoutes);
router.use('/shows', showRoutes);
router.use('/audience', audienceRoutes);
router.use('/lineup', lineupRoutes);

module.exports = router;