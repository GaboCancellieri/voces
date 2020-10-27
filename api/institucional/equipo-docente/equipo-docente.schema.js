'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoDocenteSchema = new Schema({
    nombre: String,
    apellido: String,
    rol: String,
    biografia: String,
    imagen: { data: Buffer, contentType: String },
    esDirectora: { type: Boolean, default: false },
});

module.exports = mongoose.model('EquipoDocente', EquipoDocenteSchema, 'equipoDocente');