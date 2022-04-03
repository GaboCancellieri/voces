import { model, Schema } from 'mongoose';
import { ICompra } from '../interfaces';

const Show = new Schema({
  id: { type: String },
  nombre: { type: String },
});

const Cliente = new Schema({
  id: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
});

const Resultado = new Schema({
  idOrden: { type: String },
  idPago: { type: String },
  tipoPago: { type: String },
  idSitio: { type: String },
  estado: { type: String },
});

const EntradaComprada = new Schema({
  idShow: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  inicio: { type: Date },
  fin: { type: Date },
});

const CompraSchema = new Schema({
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true },
  show: { type: Show, required: true },
  cliente: { type: [Cliente], required: true },
  resultado: { type: [Resultado], required: true },
  entradasCompradas: { type: [EntradaComprada], required: true },
});

export const Compra = model<ICompra>('Compra', CompraSchema, 'compra');
