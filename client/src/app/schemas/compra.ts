import { Entrada } from './entrada';

export class Compra {
  _id?: string;
  fecha: Date;
  monto: number;
  show: {
      id: string;
      nombre: string;
  };
  cliente: {
      id: string;
      nombre: string;
      apellido: string;
      email: string;
  };
  resultado?: {
    idOrden: string;
    idPago: string;
    tipoPago: string;
    idSitio: string;
    estado: string;
  };
  entradasCompradas?: Entrada[];
}
