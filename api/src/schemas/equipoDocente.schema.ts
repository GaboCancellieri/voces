import { model, Schema } from 'mongoose';
import { IEquipoDocente } from '../interfaces';

const EquipoDocenteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rol: { type: String, required: true },
  biografia: { type: String, required: true },
  imagen: { type: { data: Buffer, contentType: String }, required: true },
  esDirectora: { type: Boolean, default: false, required: true },
});

export const EquipoDocente = model<IEquipoDocente>(
  'EquipoDocente',
  EquipoDocenteSchema,
  'equipo_docente'
);
