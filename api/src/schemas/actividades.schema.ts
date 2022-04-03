import { model, Schema } from 'mongoose';
import { IActividad } from '../interfaces';

const Horario = new Schema({
  dia: { type: String },
  hora: { type: String },
});

const Precio = new Schema({
  descripcion: { type: String },
  inscripcion: { type: Number },
  cuotaMensual: { type: Number },
});

const ActividadSchema = new Schema({
  nombre: { type: String, required: true },
  edad: { type: String, required: true },
  cupo: { type: String, required: true },
  duracion: { type: String, required: true },
  horarios: { type: [Horario], required: true },
  precios: { type: [Precio], required: true },
});

export const Actividad = model<IActividad>(
  'Actividad',
  ActividadSchema,
  'actividades'
);
