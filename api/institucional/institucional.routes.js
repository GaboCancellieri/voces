'use strict';
module.exports = function(app) {
  var institucional = require('./institucional.controller');
  var equipo = require('./equipo-docente/equipo-docente.controller');

  // Institucional Routes
  app.route('/institucional')
    .get(institucional.getInstitucional)

  app.route('/institucional/:id')
    .patch(institucional.updateInstitucional)

  app.route('/docente/:idEquipo')
  .patch(equipo.updateEquipo)

  app.route('/docente')
  .post(equipo.createEquipo)
};
