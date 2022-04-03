import express from 'express';
const api = express.Router();
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  iniciarSesion,
  updateCliente,
  validarCliente,
} from '../controllers/cliente.controller';

api.get('/clientes', getClientes);
api.post('/clientes', createCliente);
api.get('/clientes/:idCliente', getCliente);
api.patch('/clientes/:idCliente', updateCliente);
api.delete('/clientes/:idCliente', deleteCliente);
api.post('/iniciar/:idCliente', iniciarSesion);
api.patch('/validar/cliente/:idCliente', validarCliente);

export default api;
