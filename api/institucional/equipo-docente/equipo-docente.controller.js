'use strict';
var mongoose = require('mongoose'),
Equipo = mongoose.model('EquipoDocente');

exports.getEquipo = (req, res) => {
  Equipo.find({}, (err, equipo) => {
    if (err)
      res.send(err);
    res.json(equipo[0]);
  });
};

exports.updateEquipo = (req, res) => {
  Equipo.findOneAndUpdate({_id: req.params.idEquipo}, req.body, {new: true, useFindAndModify: true}, (err, equipo) => {
    if (err)
      res.send(err);
    res.json(equipo);
  });
};

exports.createEquipo = (req, res) => {
    var new_equipo = new Paciente(req.body);
    new_equipo.save((err, equipo) => {
      if (err)
        res.send(err);
      res.json(equipo);
    });
  };
