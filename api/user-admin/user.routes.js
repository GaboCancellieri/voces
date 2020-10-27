'use strict';
module.exports = function(app) {
  var usuarios = require('./user.controller');

  // Paciente Routes
  app.route('/api/loginAdmin')
    .post(usuarios.login);
};
