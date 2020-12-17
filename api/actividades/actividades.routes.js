'use strict';
var express = require('express');
var api = express.Router();
var actividades = require('./actividades.controller');

// GETS
api.get('/actividades', actividades.getActividades)
api.post('/actividades', actividades.createActividad)
api.get('/actividades/:idActividad', actividades.getActividad)
api.patch('/actividades/:idActividad', actividades.updateActividad)
api.delete('/actividades/:idActividad', actividades.deleteActividad)

module.exports = api;
