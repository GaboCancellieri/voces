'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstitucionalSchema = new Schema({
  historia: String,
  proyecto: String,
});

module.exports = mongoose.model('Institucional', InstitucionalSchema, 'institucional');