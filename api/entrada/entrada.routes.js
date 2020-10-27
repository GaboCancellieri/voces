'use strict';
module.exports = function(app) {
  var entradas = require('./entrada.controller');

  // Entrada Routes
  app.route('/entradas')
    .get(entradas.getEntradas)
    .post(entradas.createEntrada)

  app.route('/entradas/:idEntrada')
    .get(entradas.getEntrada)
    .patch(entradas.updateEntrada)
    .delete(entradas.deleteEntrada)

  app.route('/verificar/entrada/:idShow')
  .get(entradas.verificarEntrada)
};
