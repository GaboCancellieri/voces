'use strict';
var mongoose = require('mongoose'),
Cliente = mongoose.model('Cliente');
var Email = require('../utils/mailCtrl')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getClientes = (req, res) => {
  Cliente.find({}, (err, clientes) => {
    if (err)
      res.send(err);
    res.json(clientes);
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

exports.createCliente = async (req, res) => {
  try {
    var new_cliente = new Cliente(req.body);
    var codigo = randomString(10, '#aA');
    var hash = await bcrypt.hash(codigo, saltRounds);
    new_cliente.password = await bcrypt.hash(req.body.password, saltRounds);
    new_cliente['codigo'] = hash;
    var cliente = await new_cliente.save();
    var contenido = 'CODIGO DE ACTIVACIÓN: ' + codigo;
    Email.sendEmail(cliente.email, 'Activación usuario Voces', contenido)
    res.json(cliente);
  } catch (err) {
    return res.status(400).json({ 
      imageUrl: 'https://cdn4.iconfinder.com/data/icons/mail-linefilled/512/email_mail__letter__internet__envelope__chat__screw_-256.png',
      imageHeight: 90,
      title: 'Ya existe este usuario.',
      message: 'El mail ingresado ya posee una cuenta asociada.'
    })
  }

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

exports.validarCliente = async (req, res) => {
  try {
    var codigo = req.body.params.codigo;
    var cliente = await Cliente.findById(req.params.idCliente);
    var result = await bcrypt.compare(codigo, cliente.codigo);
    if (result) {
      cliente.validado = true;
      await cliente.save();
      res.status(200).json({
        _id: cliente._id,
        email: cliente.email,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        validado: cliente.validado
      });
    } else {
      return res.status(400).json({ 
        imageUrl: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/locked-256.png',
        imageHeight: 90,
        title: 'Codigo incorrecto',
        message: 'Revise el código ingresado con el código que le llegó a su email al crear la cuenta.'
      });
    }
  } catch (err) {
    
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    var email = req.body.params.email;
    var password = req.body.params.password;
    var cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(400).json({ 
        imageUrl: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Search-Male-User.png',
        imageHeight: 90,
        title: 'Usuario no encontrado.',
        message: 'Revise el email y/o la contraseña que ingresó.'
      });
    }
    var resultado = await bcrypt.compare(password, cliente.password);
    if(resultado) {
      res.status(200).json({
        _id: cliente._id,
        email: cliente.email,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        validado: cliente.validado
      });
    } else {
      return res.status(400).json({ 
        imageUrl: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Search-Male-User.png',
        imageHeight: 90,
        title: 'Usuario no encontrado.',
        message: 'Revise el email y/o la contraseña que ingresó.'
      });
    }
  } catch (err) {
    
  }
}

exports.deleteCliente = (req, res) => {
  Cliente.remove({
    _id: req.params.idCliente
  }, (err, cliente) => {
    if (err)
      res.send(err);
    res.json(cliente);
  });
};
