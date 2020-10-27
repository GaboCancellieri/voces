import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades-web',
  templateUrl: './actividades-web.component.html',
  styleUrls: ['./actividades-web.component.scss'],
})

export class ActividadesWebComponent implements OnInit {

  actividades = [
    {
      nombre: 'Intérprete Profesional en Canto',
      edad: 'A partir de los 17 años',
      duracion: '3 años',
      horarios: {
        dias: 'Lunes, Martes y Miércoles',
        hora: '17 a 21:30hs'
      },
      costo: [{
        anio: 'Primer año',
        inscripcion: 1200,
        cuotaMensual: 5800,
      },
      {
        anio: 'Segundo año',
        inscripcion: 1200,
        cuotaMensual: 5800,
      },
      {
        anio: 'Tercer año',
        inscripcion: 1200,
        cuotaMensual: 4900,
      }],
      imagen: 'https://icon-library.com/images/singing-icon/singing-icon-4.jpg',
    },
    {
      nombre: 'Canto niños y niñas grupal',
      edad: 'De 8 a 11 años',
      cupo: '12 alumnos',
      horarios: {
        dias: 'Miércoles',
        hora: '18 a 19:30hs'
      },
      costo: [{
        inscripcion: 700,
        cuotaMensual: 1800,
      }
    ],
    imagen: 'https://icon-library.com/images/singing-icon/singing-icon-4.jpg',
    },
    {
      nombre: 'Canto adolescentes grupal',
      edad: 'De 12 a 16 años',
      cupo: '12 alumnos',
      horarios: {
        dias: 'Jueves',
        hora: '18:30 a 20hs'
      },
      costo: [{
        inscripcion: 700,
        cuotaMensual: 1800,
      }
    ],
    imagen: 'https://icon-library.com/images/singing-icon/singing-icon-4.jpg',
    },
    {
      nombre: 'Canto adultos jóvenes grupal',
      edad: 'De 17 a 20 años',
      cupo: '12 alumnos',
      horarios: {
        dias: 'Jueves',
        hora: '20 a 21:30hs'
      },
      costo: [{
        inscripcion: 700,
        cuotaMensual: 1800,
      }
    ],
    imagen: 'https://icon-library.com/images/singing-icon/singing-icon-4.jpg',
    },
    {
      nombre: 'Canto adultos jóvenes grupal',
      edad: 'De 17 a 20 años',
      cupo: '12 alumnos',
      horarios: {
        dias: 'Jueves',
        hora: '20 a 21:30hs'
      },
      costo: [{
        inscripcion: 700,
        cuotaMensual: 1800,
      }
    ],
    imagen: 'https://icon-library.com/images/singing-icon/singing-icon-4.jpg',
    },
  ];

  ngOnInit(): void {

  }
}
