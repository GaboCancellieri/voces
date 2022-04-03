import express from 'express';
const api = express.Router();
import {
  createEntrada,
  deleteEntrada,
  getEntrada,
  getEntradas,
  updateEntrada,
  verificarEntrada,
} from '../controllers/entrada.controller';

api.get('/areas', getEntradas);
api.post('/areas', createEntrada);
api.get('/areas/:idArea', getEntrada);
api.patch('/areas/:idArea', updateEntrada);
api.delete('/areas/:idArea', deleteEntrada);

api.get('/verificar/entrada/:idShow', verificarEntrada);

export default api;
