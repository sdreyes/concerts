const Artist = require('./Artist');
const Venue = require('./Venue');
const Show = require('./Show');
const Attendee = require('./Attendee');
const Lineup = require('./Lineup');
const Audience = require('./Audience');

Show.belongsToMany(Attendee, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Audience,
    unique: false
  },
  foreignKey: 'showId',
  // Define an alias for when data is retrieved
  as: 'attendees'
});

Attendee.belongsToMany(Show, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Audience,
    unique: false
  },
  foreignKey: 'attendeeId',
  // Define an alias for when data is retrieved
  as: 'shows'
});

module.exports = {
  Artist,
  Venue,
  Show,
  Attendee,
  Lineup,
  Audience
};