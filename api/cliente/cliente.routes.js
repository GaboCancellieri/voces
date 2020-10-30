'use strict';
module.exports = function(app) {
  var clientes = require('./cliente.controller');

  // Cliente Routes
  app.route('/clientes')
    .get(clientes.getClientes)
    .post(clientes.createCliente)

  app.route('/clientes/:idCliente')
    .get(clientes.getCliente)
    .patch(clientes.updateCliente)
    .delete(clientes.deleteCliente)

  app.route('/iniciar/cliente')
  .post(clientes.iniciarSesion)

  app.route('/validar/cliente/:idCliente')
  .patch(clientes.validarCliente)
};
