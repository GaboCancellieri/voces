'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntradaSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  activa: { type: Boolean, default: true },
  inicio: { type: Date, required: true },
  fin: { type: Date, required: true },
  clave: { type: String, required: true },
  idShow: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
});

module.exports = mongoose.model('Entrada', EntradaSchema, 'entradas');