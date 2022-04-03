import { model, Schema } from 'mongoose';

export interface IInstitucional {
  historia: string;
  proyecto: string;
}

const InstitucionalSchema = new Schema({
  historia: { type: String, required: true },
  proyecto: { type: String, required: true },
});

export const Institucional = model<IInstitucional>(
  'Institucional',
  InstitucionalSchema,
  'institucional'
);
