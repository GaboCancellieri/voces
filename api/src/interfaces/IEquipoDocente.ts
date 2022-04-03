export interface IEquipoDocente {
  nombre: String;
  apellido: String;
  rol: String;
  biografia: String;
  imagen: { data: Buffer; contentType: String };
  esDirectora: Boolean;
}
