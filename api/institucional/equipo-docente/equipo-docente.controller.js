'use strict';
var fs = require('fs')
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
    var new_equipo = new Equipo(req.body);
    new_equipo.save((err, equipo) => {
      if (err)
        res.send(err);
      res.json(equipo);
    });
  };

  exports.deleteEquipo = (req, res) => {
    const idEquipo = req.params.idEquipo;
    Equipo.findOne({ _id: idEquipo }, (err, equipo) => {
      if (err) {
        res.send(err)
      }

      if (equipo.imagen) {
        fs.unlink(`./dist/assets/img/docentes/${equipo.imagen}`, (err) => {
          if (err) {
            console.error(err)
            return
          }
        });
      }

      Equipo.remove({
        _id: idEquipo
      }, (err, equipo) => {
        if (err)
          res.send(err);
        res.json(equipo);
      });
    })
  };

