import { model, Schema } from 'mongoose';

export interface IImagen {
  tipo: string;
  imagen: string;
}

const ImagenSchema = new Schema({
  tipo: { type: String, required: true },
  imagen: { type: String, required: true },
});

export const Imagen = model<IImagen>('Imagen', ImagenSchema, 'imagenes');
