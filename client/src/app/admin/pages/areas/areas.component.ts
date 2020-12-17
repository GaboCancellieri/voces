import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Area } from 'src/app/schemas/area';
import { AreaService } from 'src/app/services/area.service';
import { ImagesService } from 'src/app/services/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss', '../../admin.component.scss']
})
export class AreasAdminComponent implements OnInit {

  model = new Area();
  areas: Area[] = [];
  selectedArea: Area;
  cols: any[];
  add = false;
  edit = false;
  position: string;
  msgs: Message[] = [];

  constructor(
    private areaService: AreaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private imagesService: ImagesService,
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
    ];
  }

  getAreas() {
    this.areaService.findAll().subscribe( ( areas ) => {
      this.areas = areas;
    });
  }

  save() {
    this.areaService.save(this.model).subscribe( (area) => {
      this.add = false;
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Contenido Guardado!',
      detail: 'El contenido se guardó exitosamente'});
    });
  }

  updateArea() {
    this.areaService.update(this.selectedArea._id, this.selectedArea).subscribe( (area) => {
      this.toggleEdit();
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Area Guardada!',
      detail: 'El area se guardó exitosamente'});
    });
  }

  deleteArea(position: string) {
    this.position = position;
    this.confirmationService.confirm({
        message: 'Seguro que quiere eliminar el area?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.areaService.delete(this.selectedArea._id).subscribe( (area) => {
            this.areas = this.areas.filter( a => a._id !== this.selectedArea._id);
            this.messageService.add({key: 'tr', severity: 'success',
            summary: 'Area Eliminada!', detail: 'El area se eliminó exitosamente'});
            this.selectedArea = null;
          });
        },
        key: 'positionDialog'
    });
  }

  onAdd() {
    this.add = true;
    this.selectedArea = null;
  }

  selectArea() {
    this.add = false;
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  clear() {
    this.messageService.clear();
  }

  myUploader(event): void {
    const files = event.files;
    const fileNames = [];
    const formData: FormData = new FormData();
    for (const file of files) {
        const fileName = `${this.selectedArea.nombre} - ${file.name}`;
        formData.append('upload', file, fileName);
        fileNames.push(fileName);
    }

    this.imagesService.uploadImages(formData, 'areas').subscribe((result) => {
      console.log(result);
      this.selectedArea.imagenes.push(...fileNames);
      this.areaService.update(this.selectedArea._id, this.selectedArea).subscribe((area) => {
        Swal.fire({
          title: 'Subida Exitosa!',
          text: 'Las imágenes se subieron exitosamente.',
          icon: 'success',
        });
      });
    });
  }
}
