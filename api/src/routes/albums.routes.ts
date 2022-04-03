import express from 'express';
const api = express.Router();
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from '../controllers/albums.controller';

api.get('/albums', getAlbums);
api.post('/albums', createAlbum);
api.get('/albums/:idAlbum', getAlbum);
api.patch('/albums/:idAlbum', updateAlbum);
api.delete('/albums/:idAlbum', deleteAlbum);

export default api;
