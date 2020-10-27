'use strict';
var mongoose = require('mongoose'),
Show = mongoose.model('Show');

exports.getShows = (req, res) => {
  Show.find({}, (err, shows) => {
    if (err)
      res.send(err);
    res.json(shows);''
  });
};

exports.createShow = (req, res) => {
  var new_show = new Show(req.body);
  new_show.save((err, show) => {
    if (err)
      res.send(err);
    res.json(show);
  });
};

exports.getShow = (req, res) => {
  Show.findById(req.params.idShow, (err, show) => {
    if (err)
      res.send(err);
    res.json(show);
  });
};

exports.updateShow = (req, res) => {
  Show.findOneAndUpdate({_id: req.params.idShow}, req.body, {new: true, useFindAndModify: true}, (err, show) => {
    if (err)
      res.send(err);
    res.json(show);
  });
};

exports.deleteShow = (req, res) => {
  Show.remove({
    _id: req.params.idShow
  }, (err, show) => {
    if (err)
      res.send(err);
    res.json(show);
  });
};
