export interface ICompra {
  fecha: Date;
  monto: Number;
  show: {
    id: String;
    nombre: String;
  };
  cliente: {
    id: String;
    nombre: String;
    apellido: String;
    email: String;
  };
  resultado: {
    idOrden: String;
    idPago: String;
    tipoPago: String;
    idSitio: String;
    estado: String;
  };
  entradasCompradas: [
    {
      idShow: String;
      nombre: String;
      apellido: String;
      email: String;
      inicio: Date;
      fin: Date;
    }
  ];
}
