'use strict';
var fs = require('fs')
var mongoose = require('mongoose'),
Album = mongoose.model('Album');

exports.getAlbums = async (req, res) => {
  Album.find({}, (err, albums) => {
    if (err)
      res.send(err);
    res.json(albums);
  });
};

exports.createAlbum = (req, res) => {
  var new_album = new Album(req.body);
  new_album.save((err, album) => {
    if (err)
      res.send(err);
    res.json(album);
  });
};

exports.getAlbum = (req, res) => {
  Album.findById(req.params.idAlbum, (err, album) => {
    if (err)
      res.send(err);
    res.json(album);
  });
};

exports.updateAlbum = (req, res) => {
  Album.findOneAndUpdate({_id: req.params.idAlbum}, req.body, {new: true, useFindAndModify: true}, (err, album) => {
    if (err)
      res.send(err);
    res.json(album);
  });
};

exports.deleteAlbum = (req, res) => {
  const idAlbum = req.params.idAlbum;
  Album.findOne({ _id: idAlbum }, (err, album) => {
    if (err) {
      res.send(err)
    }
    for (const image of album.imagenes) {
      fs.unlink(`./dist/assets/img/galeria/${image}`, (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
    }
    Album.remove({
      _id: req.params.idAlbum
    }, (err, album) => {
      if (err)
        res.send(err);
      res.json(album);
    });
  })
};
