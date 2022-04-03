import { model, Schema } from 'mongoose';

export interface IAlbum {
  titulo: string;
  descripcion: string;
  imagenes: string;
}

const AlbumSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: { type: [String], required: false },
});

export const Album = model<IAlbum>('Album', AlbumSchema, 'album');
