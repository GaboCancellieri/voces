import { model, Schema } from 'mongoose';

export interface IUsuario {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

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
