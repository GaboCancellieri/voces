'use strict';
var mongoose = require('mongoose'),
Imagen = mongoose.model('Imagen');

exports.getImagenes = (req, res) => {
  Imagen.find({}, (err, imagenes) => {
    if (err)
      res.send(err);
    res.json(imagenes);
  });
};

exports.getImagenesTipo = (req, res) => {
  const tipo = req.params.tipo;
  Imagen.find({tipo}, (err, imagenes) => {
    if (err)
      res.send(err);
    res.json(imagenes);
  });
};

exports.createImagen = (req, res) => {
  var new_imagen = new Imagen(req.body);
  new_imagen.save((err, imagen) => {
    if (err)
      res.send(err);
    res.json(imagen);
  });
};

exports.getImagen = (req, res) => {
  Imagen.findById(req.params.idImagen, (err, imagen) => {
    if (err)
      res.send(err);
    res.json(imagen);
  });
};

exports.updateImagen = (req, res) => {
  Imagen.findOneAndUpdate({_id: req.params.idImagen}, req.body, {new: true, useFindAndModify: true}, (err, imagen) => {
    if (err)
      res.send(err);
    res.json(imagen);
  });
};

exports.deleteImagen = (req, res) => {
  Imagen.remove({
    _id: req.params.idImagen
  }, (err, imagen) => {
    if (err)
      res.send(err);
    res.json(imagen);
  });
};
