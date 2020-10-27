'use strict';
module.exports = function(app) {
  var clientes = require('./clientes.controller');

  // Cliente Routes
  app.route('/clientes')
    .get(clientes.getClientes)
    .post(clientes.createCliente)

  app.route('/clientes/:idCliente')
    .get(clientes.getCliente)
    .patch(clientes.updateCliente)
    .delete(clientes.deleteCliente)
};
