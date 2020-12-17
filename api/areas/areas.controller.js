'use strict';
var fs = require('fs')
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
  const idArea = req.params.idArea;
  Area.findOne({ _id: idArea }, (err, area) => {
    if (err) {
      res.send(err)
    }
    for (const image of area.imagenes) {
      fs.unlink(`./dist/assets/img/areas/${image}`, (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
    }
    Area.remove({
      _id: idArea
    }, (err, area) => {
      if (err)
        res.send(err);
      res.json(area);
    });
  })
};
