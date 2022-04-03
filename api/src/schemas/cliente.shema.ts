import { model, Schema } from 'mongoose';
import { ICliente } from '../interfaces';

const ClientSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  validado: { type: Boolean, default: false },
  codigo: { type: String, required: true },
});

export const Cliente = model<ICliente>('Client', ClientSchema, 'client');
