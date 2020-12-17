'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActividadSchema = new Schema({
    nombre: { type: String, required: true },
    edad: String,
    cupo: String,
    duracion: String,
    horarios: [{
      dia: String,
      hora: String,
    }],
    precios: [{
      descripcion: String,
      inscripcion: Number,
      cuotaMensual: Number,
    }],
    imagen: String,
});

module.exports = mongoose.model('Actividad', ActividadSchema, 'actividades');