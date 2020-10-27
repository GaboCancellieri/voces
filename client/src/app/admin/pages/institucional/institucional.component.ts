import { Component, OnInit } from '@angular/core';
import { Institucional } from 'src/app/schemas/institucional';
import { Docente } from 'src/app/schemas/docente';
import { InstitucionalService } from 'src/app/services/institucional.service';
import { DocenteService } from 'src/app/services/docente.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.scss', '../../admin.component.scss']
})
export class InstitucionalAdminComponent implements OnInit {

  model = {};
  institucional = new Institucional();
  docentes: Docente[];
  selectedDocente: Docente;
  cols: any[];
  add = false;
  edit = false;
  position: string;
  msgs: Message[] = [];

  constructor(
    private institucionalService: InstitucionalService,
    private docenteService: DocenteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getInstitucional();
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
  ];
  }

  getInstitucional() {
    this.institucionalService.findAll().subscribe( ( institucional ) => {
      this.institucional = institucional[0];
      this.docentes = institucional[0].docentes;
    });
  }

  save() {
    this.institucionalService.update(this.institucional._id, this.institucional).subscribe( (institucional) => {
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Contenido Guardado!',
      detail: 'El contenido se guardó exitosamente'});
    });
  }

  updateDocente() {
    this.docenteService.update(this.selectedDocente._id, this.selectedDocente).subscribe( (docente) => {
      this.toggleEdit();
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Docente Guardado!',
      detail: 'El docente se guardó exitosamente'});
    });
  }

  deleteDocente(position: string) {
    this.position = position;
    this.confirmationService.confirm({
        message: 'Seguro que quiere eliminar el docente?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.messageService.add({key: 'tr', severity: 'success',
          summary: 'Docente Eliminado!', detail: 'El docente se eliminó exitosamente'});
        },
        key: 'positionDialog'
    });
  }

  onAdd() {
    this.add = true;
    this.selectedDocente = null;
  }

  selectDocente() {
    this.add = false;
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  clear() {
    this.messageService.clear();
  }
}
