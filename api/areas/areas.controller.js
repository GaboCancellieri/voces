'use strict';
var mongoose = require('mongoose'),
Area = mongoose.model('Area');

exports.getAreas = (req, res) => {
  Area.find({}, (err, areas) => {
    if (err)
      res.send(err);
    res.json(areas);
  });
};

exports.createArea = (req, res) => {
  var new_area = new Area(req.body);
  new_area.save((err, area) => {
    if (err)
      res.send(err);
    res.json(area);
  });
};

exports.getArea = (req, res) => {
  Area.findById(req.params.idArea, (err, area) => {
    if (err)
      res.send(err);
    res.json(area);
  });
};

exports.updateArea = (req, res) => {
  Area.findOneAndUpdate({_id: req.params.idArea}, req.body, {new: true, useFindAndModify: true}, (err, area) => {
    if (err)
      res.send(err);
    res.json(area);
  });
};

exports.deleteArea = (req, res) => {
  Area.remove({
    _id: req.params.idArea
  }, (err, area) => {
    if (err)
      res.send(err);
    res.json(area);
  });
};
