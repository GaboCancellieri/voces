'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShowsSchema = new Schema({
  nombre: {type: String, required: true},
  precio: Number,
  descripcion: String,
  repertorio: String,
  imagen: String,
  link: String,
  fechaInicioEstreno: Date, 
  fechaFinEstreno: Date,
  estado: {
    nombre: String,
    fecha: Date,
    color: String,
    icono: String,
  },
});

module.exports = mongoose.model('Show', ShowsSchema, 'shows');