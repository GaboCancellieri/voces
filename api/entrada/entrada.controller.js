'use strict';
var mongoose = require('mongoose'),
Entrada = mongoose.model('Entrada');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment')

exports.getEntradas = (req, res) => {
  var email = req.query.email;
  Entrada.find({ email, activa: true }, (err, entradas) => {
    if (err)
      res.send(err);
    res.json(entradas);''
  }).populate('idShow');
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
  bcrypt.hash(codigo, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    new_entrada['clave'] = hash
    new_entrada.save((err, entrada) => {
      if (err)
        res.send(err);
      res.json(entrada);
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
  const email = req.query.email;
  const codigo = req.query.codigo;
  const now = moment().toDate()
  Entrada.findOne({ idShow, email, 'inicio': {$lte: now}, 'fin': {$gte: now}, activa: true }, (err, entrada) => {
    if (err)
      res.send(err);
    if (!entrada) {
      return res.status(400).json({ 
        imageUrl: 'https://cdn0.iconfinder.com/data/icons/city-elements-flaticon/64/stop-stop_sign-traffic_sign-architecture_and_city-stopping-circulation-signaling-256.png',
        imageHeight: 90,
        title: 'No existe entrada',
        message: 'El mail ingresado no posee ninguna entrada activa para este show. Revise que el mail sea el mismo que le asignó al comprar la entrada.'
      });
    }
    const hash = entrada.clave;
    bcrypt.compare(codigo, hash, (err, result) => {
      if (result) {
        res.status(200).json({
          _id: entrada._id,
          email: entrada.email,
          inicio: entrada.inicio,
          fin: entrada.fin,
          activa: entrada.activa
        });
      } else {
        res.status(400).json({ 
          imageUrl: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/locked-256.png',
          imageHeight: 90,
          title: 'Codigo de entrada inválido',
          message: 'Revise el código ingresado con el código que le llegó a su email al comprar la entrada.'
        });
      }
    });
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
