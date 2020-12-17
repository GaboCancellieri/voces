import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ShowsService } from '../../../services/shows.service';
import { EntradaService } from '../../../services/entradas.service';
import { Show } from '../../../schemas/show';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generdor-entrada',
  templateUrl: './generadorEntrada.component.html',
  styleUrls: ['./generadorEntrada.component.scss', '../../admin.component.scss']
})
export class GeneradorEntradaComponent implements OnInit {

  model: any = {};
  shows: Show[];
  selectedShow: Show;
  position;
  loading = false;

  constructor(
    private showsService: ShowsService,
    private entradaService: EntradaService,
  ) {}

  ngOnInit(): void {
    this.getShows();
  }

  getShows() {
    this.showsService.findAll().subscribe((shows) => {
      this.shows = shows;
    });
  }

  validarMail() {
    return this.model.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  }

  crearEntrada() {
    this.loading = true;
    const entrada = {
      nombre: this.model.nombre,
      apellido: this.model.apellido,
      email: this.model.email,
      idShow: this.selectedShow._id,
      inicio: (this.selectedShow.fechaInicioEstreno) ? moment(this.selectedShow.fechaInicioEstreno).toDate() : moment().toDate(),
      fin: (this.selectedShow.fechaFinEstreno) ? moment(this.selectedShow.fechaFinEstreno).toDate() : moment().add(2, 'days').toDate(),
    };
    this.entradaService.crearEntradas([entrada]).subscribe((ent) => {
      this.loading = false;
      this.selectedShow = null;
      this.model = {};
      Swal.fire({
        title: 'Entrada Generada!',
        text: 'Entrada generada exitosamente.',
        icon: 'success',
      });
    });
  }
}
