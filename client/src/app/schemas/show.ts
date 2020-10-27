export class Show {
    _id?: string;
    nombre: string;
    precio: number;
    descripcion: string;
    repertorio: string;
    imagen: string;
    link: string;
    estado: {
      nombre: string;
      fecha: Date;
      color: string;
      icono: string;
    };
    fechaInicioEstreno?: Date;
    fechaFinEstreno?: Date;
}
