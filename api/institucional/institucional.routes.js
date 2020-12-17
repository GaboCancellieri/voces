'use strict';
module.exports = function(app) {
  var institucional = require('./institucional.controller');
  var equipo = require('./equipo-docente/equipo-docente.controller');

  // Institucional Routes
  app.route('/api/institucional')
    .get(institucional.getInstitucional)

  app.route('/api/institucional/:id')
    .patch(institucional.updateInstitucional)

  app.route('/api/docente/:idEquipo')
  .patch(equipo.updateEquipo)
  .delete(equipo.deleteEquipo)

  app.route('/api/docente')
  .post(equipo.createEquipo)
};
