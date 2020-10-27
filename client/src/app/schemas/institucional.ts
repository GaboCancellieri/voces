export class Institucional {
    _id: string;
    historia: string;
    proyecto: string;
    docentes: [{
      _id: string;
      nombre: string;
      apellido: string;
      rol: string;
      biografia: string;
      imagen: string;
      esDirectora: boolean;
    }];
  }
