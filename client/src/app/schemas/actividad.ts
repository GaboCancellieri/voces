export class Actividad {
    _id: string;
    nombre: string;
    edad: string;
    cupo?: string;
    duracion?: string;
    horarios: [{
      dia: string,
      hora: string,
    }];
    precios: [{
      descripcion: string;
      inscripcion: number;
      cuotaMensual: number;
    }];
    imagen: string;
  }
