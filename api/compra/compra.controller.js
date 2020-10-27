'use strict';
var mongoose = require('mongoose'),
Compra = mongoose.model('Compra');

exports.getCompras = (req, res) => {
  Compra.find({}, (err, compras) => {
    if (err)
      res.send(err);
    res.json(compras);''
  });
};

exports.createCompra = (req, res) => {
  var new_compra = new Compra(req.body);
  new_compra.save((err, compra) => {
    if (err)
      res.send(err);
    res.json(compra);
  });
};

exports.getCompra = (req, res) => {
  Compra.findById(req.params.idCompra, (err, compra) => {
    if (err)
      res.send(err);
    res.json(compra);
  });
};

exports.updateCompra = (req, res) => {
  Compra.findOneAndUpdate({_id: req.params.idCompra}, req.body, {new: true, useFindAndModify: true}, (err, compra) => {
    if (err)
      res.send(err);
    res.json(compra);
  });
};

exports.deleteCompra = (req, res) => {
  Compra.remove({
    _id: req.params.idCompra
  }, (err, compra) => {
    if (err)
      res.send(err);
    res.json(compra);
  });
};
