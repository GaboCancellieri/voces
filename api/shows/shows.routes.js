'use strict';
module.exports = function(app) {
  var shows = require('./shows.controller');

  // Shows Routes
  app.route('/shows')
    .get(shows.getShows)
    .post(shows.createShow)

  app.route('/shows/:idShow')
    .get(shows.getShow)
    .patch(shows.updateShow)
    .delete(shows.deleteShow)
};
