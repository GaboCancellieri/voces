import express from 'express';
const api = express.Router();
import {
  createActividad,
  deleteActividad,
  getActividad,
  getActividades,
  updateActividad,
} from '../controllers/actividades.controller';

api.get('/actividades', getActividades);
api.post('/actividades', createActividad);
api.get('/actividades/:idActividad', getActividad);
api.patch('/actividades/:idActividad', updateActividad);
api.delete('/actividades/:idActividad', deleteActividad);

export default api;
