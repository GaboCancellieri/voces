import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EntradaService } from 'src/app/services/entradas.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-streaming',
  templateUrl: './user-streaming.component.html',
  styleUrls: ['./user-streaming.component.scss']
})
export class UserStreamingComponent implements OnInit {

  @Input() cliente = null;
  @Output() logoutCliente = new EventEmitter();

  entradas = [];
  mostrarCliente = 'inicio';

  constructor(
    private router: Router,
    private entradaService: EntradaService,
  ) {}

  ngOnInit(): void {
    if (this.cliente) {
      this.buscarEntradas();
    }
  }

  buscarEntradas() {
    this.entradaService.buscarEntradas(this.cliente.email).subscribe((entradas) => {
      if (entradas.length > 0) {
        console.log(moment(entradas[0].inicio).toDate());
        console.log(moment(entradas[0].inicio).format('DD/MM/YYYY HH:mm'));
        console.log(moment.utc(entradas[0].inicio).format('DD/MM/YYYY HH:mm'));
        console.log(moment.utc(entradas[0].inicio).local().format('DD/MM/YYYY HH:mm'));
        for (const entrada of entradas) {
          entrada.situacion = this.entradaVencida(entrada);
          this.entradas.push(entrada);
        }
      }
    });
  }

  entradaVencida(entrada) {
    let situacion = 'vencida';
    if ((moment(entrada.inicio).isSameOrBefore(moment().toDate())) && (moment(entrada.fin).isSameOrAfter(moment().toDate()))){
      situacion = 'habilitada';
    } else if ((moment(entrada.inicio).isAfter(moment().toDate())) && (moment(entrada.fin).isAfter(moment().toDate()))) {
      situacion = 'espera';
    }
    console.log(situacion);
    return situacion;
  }

  verShow(id) {
    this.router.navigate([`/streaming/watch/${id}`]);
  }

  goTo(site) {
    this.mostrarCliente = site;
  }

  logout() {
    Swal.fire({
      title: 'Cerrar sesion',
      text: `¿Quiere cerrar sesion?`,
      imageUrl: 'https://cdn2.iconfinder.com/data/icons/crystalproject/crystal_project_256x256/apps/exit.png',
      imageHeight: 90,
      imageAlt: 'logout',
      showCancelButton: true,
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
      confirmButtonColor: '#FC01A0',
      cancelButtonColor: '#444444',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logoutCliente.emit();
      }
    });
  }

  realizarCompra(show) {
    console.log(show);
    this.router.navigate([`streaming/comprar/${show._id}`]);
  }
}
