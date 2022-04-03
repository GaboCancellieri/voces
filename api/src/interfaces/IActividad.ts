export interface IActividad {
  nombre: string;
  edad: string;
  cupo: string;
  duracion: string;
  horarios: [
    {
      dia: String;
      hora: String;
    }
  ];
  precios: [
    {
      descripcion: String;
      inscripcion: Number;
      cuotaMensual: Number;
    }
  ];
}
