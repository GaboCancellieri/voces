import { model, Schema } from 'mongoose';
import { IArea } from '../interfaces';

const AreaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: { type: [String], required: false },
});

export const Area = model<IArea>('Area', AreaSchema, 'area');
