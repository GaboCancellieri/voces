'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  imagenes: [String],
});

module.exports = mongoose.model('Area', AreaSchema, 'areas');