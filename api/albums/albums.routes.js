'use strict';
module.exports = function(app) {
  var albums = require('./albums.controller');

  // Album Routes
  app.route('/api/albums')
    .get(albums.getAlbums)
    .post(albums.createAlbum)

  app.route('/api/albums/:idAlbum')
    .get(albums.getAlbum)
    .patch(albums.updateAlbum)
    .delete(albums.deleteAlbum)
};
