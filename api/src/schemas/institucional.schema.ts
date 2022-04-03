import { model, Schema } from 'mongoose';
import { IInstitucional } from '../interfaces';

const InstitucionalSchema = new Schema({
  historia: { type: String, required: true },
  proyecto: { type: String, required: true },
});

export const Institucional = model<IInstitucional>(
  'Institucional',
  InstitucionalSchema,
  'institucional'
);
