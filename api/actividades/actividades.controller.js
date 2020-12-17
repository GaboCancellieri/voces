'use strict';
var fs = require('fs')
var mongoose = require('mongoose'),
Actividad = mongoose.model('Actividad');

exports.getActividades = (req, res) => {
  Actividad.find({}, (err, actividades) => {
    if (err)
      res.send(err);
    res.json(actividades);
  });
};

exports.createActividad = (req, res) => {
  var new_actividad = new Actividad(req.body);
  new_actividad.save((err, actividad) => {
    if (err)
      res.send(err);
    res.json(actividad);
  });
};

exports.getActividad = (req, res) => {
  Actividad.findById(req.params.idActividad, (err, actividad) => {
    if (err)
      res.send(err);
    res.json(actividad);
  });
};

exports.updateActividad = (req, res) => {
  Actividad.findOneAndUpdate({_id: req.params.idActividad}, req.body, {new: true, useFindAndModify: true}, (err, actividad) => {
    if (err)
      res.send(err);
    res.json(actividad);
  });
};

exports.deleteActividad = (req, res) => {
  const idActividad = req.params.idActividad;
  Actividad.findOne({ _id: idActividad }, (err, actividad) => {
    if (err) {
      res.send(err)
    }

    if (actividad.imagen) {
      fs.unlink(`./dist/assets/img/actividades/${actividad.imagen}`, (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
    }

    Actividad.remove({
      _id: idActividad
    }, (err, actividad) => {
      if (err)
        res.send(err);
      res.json(actividad);
    });
  })
};
