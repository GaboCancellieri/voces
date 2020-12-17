'use strict';
module.exports = function(app) {
  var compras = require('./compra.controller');

  // Compra Routes
  app.route('/api/compras')
    .get(compras.getCompras)
    .post(compras.createCompra)

  app.route('/api/compras/:idCompra')
    .get(compras.getCompra)
    .patch(compras.updateCompra)
    .delete(compras.deleteCompra)

  app.route('/api/mercadopago/identificationTypes')
    .get(compras.getIdentificationTypes)

  app.route('/api/mercadopago/comprarEntrada')
    .post(compras.comprarEntrada)

  app.route('/api/mercadopago/preferencia')
  .post(compras.crearPreferencia)
};
