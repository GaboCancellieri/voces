'use strict';
var mongoose = require('mongoose'),
Cliente = mongoose.model('Cliente');

exports.getClientes = (req, res) => {
  Cliente.find({}, (err, clientes) => {
    if (err)
      res.send(err);
    res.json(clientes);
  });
};

exports.createCliente = (req, res) => {
  var new_cliente = new Cliente(req.body);
  new_cliente.save((err, cliente) => {
    if (err)
      res.send(err);
    res.json(cliente);
  });
};

exports.getCliente = (req, res) => {
  Cliente.findById(req.params.idCliente, (err, cliente) => {
    if (err)
      res.send(err);
    res.json(cliente);
  });
};

exports.updateCliente = (req, res) => {
  Cliente.findOneAndUpdate({_id: req.params.idCliente}, req.body, {new: true, useFindAndModify: true}, (err, cliente) => {
    if (err)
      res.send(err);
    res.json(cliente);
  });
};

exports.deleteCliente = (req, res) => {
  Cliente.remove({
    _id: req.params.idCliente
  }, (err, cliente) => {
    if (err)
      res.send(err);
    res.json(cliente);
  });
};
