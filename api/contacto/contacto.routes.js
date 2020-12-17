'use strict';
module.exports = (app) => {
  var mailController = require('./contacto.controller');

  // Entrada Routes
  app.route('/api/email/send')
    .post(mailController.sendEmail)
};