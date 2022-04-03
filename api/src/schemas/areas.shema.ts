import { model, Schema } from 'mongoose';

export interface IArea {
  nombre: string;
  descripcion: string;
  imagenes: string;
}

const AreaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: { type: [String], required: false },
});

export const Area = model<IArea>('Area', AreaSchema, 'area');
