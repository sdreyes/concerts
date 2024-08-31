const Artist = require('./Artist');
const Venue = require('./Venue');
const Show = require('./Show');
const Attendee = require('./Attendee');
const Lineup = require('./Lineup');
const Audience = require('./Audience');
const Tag = require('./Tag');
const ShowTag = require('./ShowTag');

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

// Venue to Show (one:many) relationship
Show.belongsTo(Venue, {
  foreignKey: 'venueId',
  as: 'location'
});

// Show to Tag (many:many) relationships
Show.belongsToMany(Tag, {
  through: {
    model: ShowTag,
    unique: false
  },
  foreignKey: 'showId',
  as: 'tags'
});

Tag.belongsToMany(Show, {
  through: {
    model: ShowTag,
    unique: false
  },
  foreignKey: 'tagId',
  as: 'shows'
});

module.exports = {
  Artist,
  Venue,
  Show,
  Attendee,
  Lineup,
  Audience,
  Tag,
  ShowTag
};