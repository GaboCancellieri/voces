import { model, Schema } from 'mongoose';

export interface IClient {
  nombre: String;
  apellido: String;
  email: String;
  password: String;
  validado: Boolean;
  codigo: String;
}

const ClientSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  validado: { type: Boolean, default: false },
  codigo: { type: String, required: true },
});

export const Client = model<IClient>('Client', ClientSchema, 'client');
