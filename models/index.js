const Artist = require('./Artist');
const Venue = require('./Venue');
const Show = require('./Show');
const Attendee = require('./Attendee');
const Lineup = require('./Lineup');
const Audience = require('./Audience');

// Show to Attendee (many:many) relationships
Show.belongsToMany(Attendee, {
  through: {
    model: Audience,
    unique: false
  },
  foreignKey: 'showId',
  as: 'attendees'
});

Attendee.belongsToMany(Show, {
  through: {
    model: Audience,
    unique: false
  },
  foreignKey: 'attendeeId',
  as: 'shows'
});

// Show to Artist (many:many) relationships
Artist.belongsToMany(Show, {
  through: {
    model: Lineup,
    unique: false
  },
  foreignKey: 'artistId',
  as: 'artists'
});

Show.belongsToMany(Artist, {
  through: {
    model: Lineup,
    unique: false
  },
  foreignKey: 'showId',
  as: 'artistLineup'
});

module.exports = {
  Artist,
  Venue,
  Show,
  Attendee,
  Lineup,
  Audience
};