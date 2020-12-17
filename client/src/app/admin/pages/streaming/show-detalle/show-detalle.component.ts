import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Show } from 'src/app/schemas/show';
import { ImagesService } from 'src/app/services/images.service';
import { ShowsService } from 'src/app/services/shows.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-detalle-admin',
  templateUrl: './show-detalle.component.html',
  styleUrls: ['./show-detalle.component.scss', '../../../admin.component.scss']
})
export class ShowDetalleAdminComponent implements OnInit {

  show: Show;
  showAux: Show;
  edit = false;
  displayCambiar = false;
  selectedEstado;
  estados = [
    {nombre: 'Estreno'},
    {nombre: 'Comprar'},
    {nombre: 'Gratis'},
    {nombre: 'Inactivo'},
  ];
  es = {
    firstDayOfWeek: 1,
    dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
    dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
    dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
    monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
    monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
    today: 'Hoy',
    clear: 'Borrar'
  };

  constructor(
      private showsService: ShowsService,
      private imagesService: ImagesService,
      private router: Router,
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getShow();
  }

  getShow() {
    this.route.params.subscribe((params: any) => {
      if (params.idShow) {
        this.showsService.findOne(params.idShow).subscribe((show) => {
            this.show = show;
            this.showAux = Object.assign(show);
            console.log(show);
      });
      } else {
        this.show = {
          nombre: '',
          precio: 0,
          descripcion: '',
          repertorio: '',
          imagen: '',
          link: '',
          estado: {
            nombre: '',
            fecha: moment().toDate(),
            color: '',
            icono: '',
          }
        };
      }
      console.log(this.show);
    });
  }

  onSave() {
    if (this.selectedEstado && this.selectedEstado.nombre !== this.show.estado.nombre) {
      this.show.estado = this.cambiarEstado(this.selectedEstado.nombre);
    }

    if (this.show._id) {
      this.showsService.update(this.show._id, this.show).subscribe((show) => {
        this.edit = false;
        Swal.fire({
          title: 'Show actualizado!',
          text: 'Se actualizó el show exitosamente.',
          icon: 'success',
        });
      });
    } else {
      this.showsService.save(this.show).subscribe((show) => {
        this.edit = false;
        Swal.fire({
          title: 'Show creado!',
          text: 'Se creó el show exitosamente.',
          icon: 'success',
        });
      });
    }
  }

  cambiarEstado(nombreEstado) {
     const result = {
       nombre: nombreEstado,
       fecha: moment().toDate(),
       color: null,
       icono: null,
     };

     if (nombreEstado === 'Gratis') {
       result.color = 'success';
       result.icono = 'play';
     } else if (nombreEstado === 'Comprar') {
        result.color = 'primary';
        result.icono = 'ticket-alt';
     } else if (nombreEstado === 'Estreno') {
       result.color = 'warning';
       result.icono = 'star';
     } else if (nombreEstado === 'Inactivo') {
      result.color = 'danger';
      result.icono = 'ban';
    }

     return result;
  }

  toggleEdit(condition) {
    this.edit = condition;
    if (!condition) {
      this.show = Object.assign(this.showAux);
    }
  }

  myUploader(event): void {
    const file = event.files[0];
    const formData: FormData = new FormData();
    const fileName = `Show - ${file.name}`;
    formData.append('upload', file, fileName);

    this.imagesService.uploadImages(formData, 'shows').subscribe((result) => {
      this.show.imagen = fileName;
      this.showsService.update(this.show._id, this.show).subscribe((show) => {
        Swal.fire({
          title: 'Subida!',
          text: 'La imagen se subió exitosamente.',
          icon: 'success',
        });
      });
    });
  }

  onCancel() {
      this.router.navigate(['/admin-voces/streaming']);
  }
}
