'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var Usuario = mongoose.model('UsuarioAdmin');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = (req, res) => {
  var username = req.body.username
  var password = req.body.password

  Usuario.findOne({ username }, (err, usuario) => {
    if (err) {
      res.send(err);
    }

    if (!usuario) {
      return res.status(401).send({
        error: 'usuario o contraseña inválidos'
      });
    }

    //KDvz8:F_

    bcrypt.compare(password, usuario.password, (err, result) => {
      if (result) {  
        var tokenData = {
          username: username
        }
      
        var token = jwt.sign(tokenData, 'Secret Password', {
           expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        const expiration = moment().add(1, 'day').toDate();
        delete usuario['password'];
      
        res.json({
          user: usuario,
          token,
          expiration
        })
      } else {
        return res.status(401).send({
          error: 'usuario o contraseña inválidos'
        });
      }
    });
  });
};