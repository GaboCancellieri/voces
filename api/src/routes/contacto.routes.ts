import express from 'express';
const api = express.Router();
import { contactoSendEmail } from '../controllers/contacto.controller';

api.post('/email/send', contactoSendEmail);

export default api;
