'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  validado: { type: Boolean, default: false },
  codigo: { type: String, required: true },
});

module.exports = mongoose.model('Cliente', ClienteSchema, 'clientes');