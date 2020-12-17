'use strict';
module.exports = function(app) {
  var areas = require('./areas.controller');

  // Area Routes
  app.route('/api/areas')
    .get(areas.getAreas)
    .post(areas.createArea)

  app.route('/api/areas/:idArea')
    .get(areas.getArea)
    .patch(areas.updateArea)
    .delete(areas.deleteArea)
};
