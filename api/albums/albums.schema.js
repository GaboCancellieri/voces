'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  titulo: {type: String, required: true},
  descripcion: String,
  imagenes: [String],
});

module.exports = mongoose.model('Album', AlbumSchema, 'albums');