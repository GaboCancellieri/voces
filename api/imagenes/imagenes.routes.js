'use strict';
module.exports = function(app) {
  var imagenes = require('./imagenes.controller');

  // Imagen Routes
  app.route('/api/imagenes')
    .get(imagenes.getImagenes)
    .post(imagenes.createImagen)

  app.route('/api/imagenes/tipo/:tipo')
  .get(imagenes.getImagenesTipo)

  app.route('/api/imagenes/:idImagen')
    .get(imagenes.getImagen)
    .patch(imagenes.updateImagen)
    .delete(imagenes.deleteImagen)
};
