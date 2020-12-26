'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompraSchema = new Schema({
    fecha: { type: Date, default: true },
    monto: { type: Number, default: true },
    show: { 
        id: String,
        nombre: String,
    },
    cliente: { 
        id: String,  
        nombre: String,
        apellido: String,
        email: String,
    },
    resultado: {
        idOrden: String,
        idPago: String,
        tipoPago: String,
        idSitio: String,
        estado: String,
    },
    entradasCompradas: [{
        idShow: String,
        nombre: String,
        apellido: String,
        email: String,
        inicio: Date,
        fin: Date,
    }]
});

module.exports = mongoose.model('Compra', CompraSchema, 'compras');