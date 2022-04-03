import { model, Schema } from 'mongoose';

export interface IEntrada {
  nombre: string;
  apellido: string;
  email: string;
  activa: boolean;
  inicio: Date;
  fin: Date;
  clave: string;
  idShow: string;
}

const EntradaSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  activa: { type: Boolean, required: true },
  inicio: { type: Date, required: true },
  fin: { type: Date, required: true },
  clave: { type: String, required: true },
  idShow: { type: String, required: true },
});

export const Entrada = model<IEntrada>('Entrada', EntradaSchema, 'entradas');
