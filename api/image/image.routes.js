'use strict';
module.exports = function(app) {
  var images = require('./image.controller');

  // Image Routes
  app.route('/api/images/:folder')
    .post(images.uploadImages)
  
  app.route('/api/images/:folder/:imageName')
  .delete(images.deleteImage)

};