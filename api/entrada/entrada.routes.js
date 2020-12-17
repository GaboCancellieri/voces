'use strict';
module.exports = function(app) {
  var entradas = require('./entrada.controller');

  // Entrada Routes
  app.route('/api/entradas')
    .get(entradas.getEntradas)
    .post(entradas.createEntrada)

  app.route('/api/entradas/:idEntrada')
    .get(entradas.getEntrada)
    .patch(entradas.updateEntrada)
    .delete(entradas.deleteEntrada)

  app.route('/api/verificar/entrada/:idShow')
  .get(entradas.verificarEntrada)
};
