import { model, Schema } from 'mongoose';
import { IAlbum } from '../interfaces';

const AlbumSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: { type: [String], required: false },
});

export const Album = model<IAlbum>('Album', AlbumSchema, 'album');
