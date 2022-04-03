import { model, Schema } from 'mongoose';
import { IUsuario } from '../interfaces';

const UsuarioSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Usuario = model<IUsuario>(
  'UsuarioAdmin',
  UsuarioSchema,
  'usuariosAdmin'
);
