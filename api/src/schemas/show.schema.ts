import { model, Schema } from 'mongoose';
import { IShow } from '../interfaces';

const Estado = new Schema({
  nombre: { type: String },
  fecha: { type: Date },
  color: { type: String },
  icono: { type: String },
});

const ShowsSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  repertorio: { type: String, required: true },
  imagen: { type: String, required: true },
  link: { type: String, required: true },
  fechaInicioEstreno: { type: Date, required: true },
  fechaFinEstreno: { type: Date, required: true },
  estado: { type: Estado, required: true },
});

export const Show = model<IShow>('Show', ShowsSchema, 'shows');
