import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ImagesService } from 'src/app/services/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss', '../../admin.component.scss']
})
export class ActividadesAdminComponent implements OnInit {

  model: any = {};
  actividades = [];
  selectedActividad;
  add = false;
  edit = false;
  addHorario = false;
  dia;
  hora;
  addPrecio = false;
  inscripcion;
  cuotaMensual;
  descripcion;
  cols = [
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    private actividadesService: ActividadesService,
    private imagesService: ImagesService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades() {
    this.actividadesService.findAll().subscribe((actividades) => {
      this.actividades = actividades;
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  updateActividad() {
    this.actividadesService.update(this.selectedActividad._id, this.selectedActividad).subscribe( (actividad) => {
      this.toggleEdit();
      Swal.fire({
        title: 'Contenido Guardado!',
        text: 'El contenido se guardó exitosamente.',
        icon: 'success',
      });
    });
  }

  onAdd() {
    this.add = true;
    this.selectedActividad = null;
  }

  onAddHorario() {
    const newHorario = {
      dia: this.dia,
      hora: this.hora,
    };

    if (this.selectedActividad && !this.add) {
      this.selectedActividad.horarios.push(newHorario);
    } else if (!this.selectedActividad && this.add) {
      if (!this.model.horarios) {
        this.model.horarios = [];
      }

      this.model.horarios.push(newHorario);
      this.addHorario = false;
    }

    this.dia = null;
    this.hora = null;
  }

  onAddPrecio() {
    const newPrecio = {
      inscripcion: this.inscripcion,
      cuotaMensual: this.cuotaMensual,
      descripcion: this.descripcion,
    };

    if (this.selectedActividad && !this.add) {
      this.selectedActividad.precios.push(newPrecio);
    } else if (!this.selectedActividad && this.add) {
      if (!this.model.precios) {
        this.model.precios = [];
      }

      this.model.precios.push(newPrecio);
      this.addPrecio = false;
    }

    this.inscripcion = null;
    this.cuotaMensual = null;
    this.descripcion = null;
  }

  save() {
    this.actividadesService.save(this.model).subscribe((actividad) => {
      this.add = false;
      Swal.fire({
        title: 'Contenido Guardado!',
        text: 'El contenido se guardó exitosamente.',
        icon: 'success',
      });
    });
  }

  deleteActividad() {
    this.confirmationService.confirm({
        message: 'Seguro que quiere eliminar la actividad?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.actividadesService.delete(this.selectedActividad._id).subscribe( (actividad) => {
            this.actividades = this.actividades.filter( a => a._id !== this.selectedActividad._id);
            Swal.fire({
              title: 'Actividad Eliminada!',
              text: 'La actividad se eliminó exitosamente.',
              icon: 'success',
            });
            this.selectedActividad = null;
          });
        },
        key: 'positionDialog'
    });
  }

  myUploader(event): void {
    const file = event.files[0];
    const formData: FormData = new FormData();
    const fileName = `${this.selectedActividad.nombre} - ${file.name}`;
    formData.append('upload', file, fileName);

    this.imagesService.uploadImages(formData, 'actividades').subscribe((result) => {
      this.selectedActividad.imagen = fileName;
      this.actividadesService.update(this.selectedActividad._id, this.selectedActividad).subscribe((actividad) => {
        Swal.fire({
          title: 'Subida!',
          text: 'La imagen se subió exitosamente.',
          icon: 'success',
        });
      });
    });
  }
}
