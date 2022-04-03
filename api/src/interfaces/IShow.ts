export interface IShow {
  nombre: string;
  precio: number;
  descripcion: string;
  repertorio: string;
  imagen: string;
  link: string;
  fechaInicioEstreno: Date;
  fechaFinEstreno: Date;
  estado: {
    nombre: string;
    fecha: Date;
    color: string;
    icono: string;
  };
}
