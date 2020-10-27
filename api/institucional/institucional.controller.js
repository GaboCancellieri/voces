'use strict';
var mongoose = require('mongoose'),
Institucional = mongoose.model('Institucional'),
EquipoDocente = mongoose.model('EquipoDocente');

exports.getInstitucional = (req, res) => {
  Institucional.find({}, (err, institucional) => {
    EquipoDocente.find({}, (err, equipo) => {
      if (err)
        res.send(err);
      res.json([{
        _id: institucional[0]._id,
        historia: institucional[0].historia,
        proyecto: institucional[0].proyecto,
        docentes: equipo
      }]);
    });
  });
};

exports.updateInstitucional = (req, res) => {
  console.log(req.params.id)
  Institucional.findOneAndUpdate({_id: req.params.id}, req.body, {new: false}, (err, institucional) => {
    if (err)
      res.send(err);
    res.json(institucional);
  });
};
