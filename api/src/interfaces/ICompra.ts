export interface ICompra {
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
  resultado: {
    idOrden: string;
    idPago: string;
    tipoPago: string;
    idSitio: string;
    estado: string;
  };
  entradasCompradas: [
    {
      idShow: string;
      nombre: string;
      apellido: string;
      email: string;
      inicio: Date;
      fin: Date;
    }
  ];
}
