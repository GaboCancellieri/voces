import express from 'express';
const api = express.Router();
import {
  getCompras,
  createCompra,
  getCompra,
  updateCompra,
  deleteCompra,
  getIdentificationTypes,
  comprarEntrada,
  crearPreferencia,
} from '../controllers/compra.controller';

api.get('/compras', getCompras);
api.post('/compras', createCompra);
api.get('/compras/:idCompra', getCompra);
api.patch('/compras/:idCompra', updateCompra);
api.delete('/compras/:idCompra', deleteCompra);

api.get('/mercadopago/identificationTypes', getIdentificationTypes);
api.delete('/mercadopago/comprarEntrada', comprarEntrada);
api.delete('/mercadopago/preferencia', crearPreferencia);

export default api;
