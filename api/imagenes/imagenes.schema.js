'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema = new Schema({
  tipo: {type: String, required: true},
  imagen: {type: String, required: true},
});

module.exports = mongoose.model('Imagen', ImagenSchema, 'imagenes');