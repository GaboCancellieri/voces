'use strict';
module.exports = function(app) {
  var compras = require('./compra.controller');

  // Compra Routes
  app.route('/compras')
    .get(compras.getCompras)
    .post(compras.createCompra)

  app.route('/compras/:idCompra')
    .get(compras.getCompra)
    .patch(compras.updateCompra)
    .delete(compras.deleteCompra)
};
