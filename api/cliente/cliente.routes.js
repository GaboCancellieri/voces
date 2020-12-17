'use strict';
module.exports = function(app) {
  var clientes = require('./cliente.controller');

  // Cliente Routes
  app.route('/api/clientes')
    .get(clientes.getClientes)
    .post(clientes.createCliente)

  app.route('/api/clientes/:idCliente')
    .get(clientes.getCliente)
    .patch(clientes.updateCliente)
    .delete(clientes.deleteCliente)

  app.route('/api/iniciar/cliente')
  .post(clientes.iniciarSesion)

  app.route('/api/validar/cliente/:idCliente')
  .patch(clientes.validarCliente)
};
