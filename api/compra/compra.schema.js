'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompraSchema = new Schema({
    fecha: { type: Date, default: true },
    monto: { type: Number, default: true },
    idShow: { 
        id: String,
        nombre: String,
    },
    cliente: { 
        id: String,  
        nombre: String,
        apellido: String,
        email: String,
    },
    entradas: [{
        id: String,
        email: String,
    }]
});

module.exports = mongoose.model('Compra', CompraSchema, 'compras');