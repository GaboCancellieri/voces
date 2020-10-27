'use strict';
var mongoose = require('mongoose'),
Entrada = mongoose.model('Entrada');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getEntradas = (req, res) => {
  Entrada.find({}, (err, entradas) => {
    if (err)
      res.send(err);
    res.json(entradas);''
  });
};

function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

exports.createEntrada = (req, res) => {
  var new_entrada = new Entrada(req.body);
  var codigo = randomString(10, '#aA');
  console.log(codigo)
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(codigo, salt, (err, hash) => {
      new_entrada['clave'] = hash
      new_entrada.save((err, entrada) => {
        if (err)
          res.send(err);
        res.json(entrada);
      });
    });
  });
};

exports.getEntrada = (req, res) => {
  Entrada.findById(req.params.idEntrada, (err, entrada) => {
    if (err)
      res.send(err);
    res.json(entrada);
  });
};

exports.verificarEntrada = (req, res) => {
  const idShow = req.params.idShow
  console.log(req.query)
  Entrada.findById(idShow, (err, entrada) => {
    if (err)
      res.send(err);
    res.json(entrada);
  });
};

exports.updateEntrada = (req, res) => {
  Entrada.findOneAndUpdate({_id: req.params.idEntrada}, req.body, {new: true, useFindAndModify: true}, (err, entrada) => {
    if (err)
      res.send(err);
    res.json(entrada);
  });
};

exports.deleteEntrada = (req, res) => {
  Entrada.remove({
    _id: req.params.idEntrada
  }, (err, entrada) => {
    if (err)
      res.send(err);
    res.json(entrada);
  });
};
