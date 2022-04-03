import express from 'express';
const api = express.Router();
import {
  createArea,
  deleteArea,
  getArea,
  getAreas,
  updateArea,
} from '../controllers/areas.controller';

api.get('/areas', getAreas);
api.post('/areas', createArea);
api.get('/areas/:idArea', getArea);
api.patch('/areas/:idArea', updateArea);
api.delete('/areas/:idArea', deleteArea);

export default api;
