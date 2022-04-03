import moment from 'moment';
import jwt from 'jsonwebtoken';
import { Usuario } from '../schemas';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUsuario, IUsuarioWithOutPass } from '../interfaces';

export const login = async (req: Request, res: Response) => {
  try {
    var username = req.body.username;
    var password = req.body.password;

    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).send({
        error: 'usuario o contraseña inválidos',
      });
    }

    //KDvz8:F_

    const result = await bcrypt.compare(password, usuario.password);
    if (result) {
      var tokenData = {
        username: username,
      };

      var token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
      });

      const expiration = moment().add(1, 'day').toDate();
      const usuarioWithOutPass: IUsuarioWithOutPass = {
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        username: usuario.username,
      };

      res.json({
        user: usuarioWithOutPass,
        token,
        expiration,
      });
    } else {
      return res.status(401).send({
        error: 'usuario o contraseña inválidos',
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
