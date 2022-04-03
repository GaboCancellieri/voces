import { model, Schema } from 'mongoose';
import { IImagen } from '../interfaces';

const ImagenSchema = new Schema({
  tipo: { type: String, required: true },
  imagen: { type: String, required: true },
});

export const Imagen = model<IImagen>('Imagen', ImagenSchema, 'imagenes');
