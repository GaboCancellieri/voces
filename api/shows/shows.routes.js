'use strict';
module.exports = function(app) {
  var shows = require('./shows.controller');

  // Shows Routes
  app.route('/api/shows')
    .get(shows.getShows)
    .post(shows.createShow)

  app.route('/api/shows/:idShow')
    .get(shows.getShow)
    .patch(shows.updateShow)
    .delete(shows.deleteShow)
};
