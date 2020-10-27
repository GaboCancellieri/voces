'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShowsSchema = new Schema({
  nombre: {type: String, required: true},
  precio: {type: Number, required: true},
  descripcion: { type: Number, required: true },
  repertorio: String,
  imagen: {type: String, required: true},
  link: {type: String, required: true},
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