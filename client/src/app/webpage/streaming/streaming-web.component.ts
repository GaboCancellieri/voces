import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Cliente } from 'src/app/schemas/cliente';
import { Show } from 'src/app/schemas/show';
import { ClienteService } from 'src/app/services/cliente.service';
import { EntradaService } from 'src/app/services/entradas.service';
import { ShowsService } from 'src/app/services/shows.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-streaming-web',
  templateUrl: './streaming-web.component.html',
  styleUrls: ['./streaming-web.component.scss']
})
export class StreamingWebComponent implements OnInit {
  @ViewChild('close') cerrarModal: ElementRef;

  model: any = {};
  modelRegistro: any = {};
  modelValidacion: any = {};
  cliente: Cliente;
  mostrarCliente = 'inicio';
  mostrar = 'inicio';
  estrenos: Show[];
  compra: Show[];
  gratis: Show[];
  entradas;

  constructor(
    private router: Router,
    private showsService: ShowsService,
    private entradaService: EntradaService,
    private clienteService: ClienteService,
  )
  {}

  ngOnInit(): void {
    this.getCliente();
    this.getShows();
  }

  getCliente() {
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      this.cliente = JSON.parse(cliente);
      this.buscarEntradas();
    }
    console.log(this.cliente);
  }

  getShows() {
    this.showsService.findAll().subscribe((shows) => {
      this.estrenos = shows.filter(s => s.estado.nombre.toLowerCase() === 'estreno');
      console.log(this.estrenos);
      this.compra = shows.filter(s => s.estado.nombre.toLowerCase() === 'comprar');
      this.gratis = shows.filter(s => s.estado.nombre.toLowerCase() === 'gratis');
    });
  }

  iniciarSesion() {
    const mailValido = this.validarMail();
    if (mailValido) {
      this.clienteService.iniciarSesion(this.model.email, this.model.password).subscribe((cliente) => {
        if (cliente.validado) {
          this.model = {};
          this.cerrarModal.nativeElement.click();
          localStorage.setItem('cliente', JSON.stringify(cliente));
          Swal.fire({
            title: 'Bienvenido!',
            text: '',
            icon: 'success',
            confirmButtonColor: '#FC01A0',
          });
        } else {
          this.mostrar = 'validacion';
        }
        this.cliente = cliente;
      });
    } else {
      Swal.fire({
        title: 'Mail inválido!',
        text: 'Por favor, ingrese un mail válido.',
        imageUrl: 'https://cdn4.iconfinder.com/data/icons/mail-linefilled/512/email_mail__letter__internet__envelope__chat__error_-256.png',
        imageHeight: 90,
        imageAlt: 'mail invalido',
        confirmButtonColor: '#FC01A0',
      });
    }
  }

  registrarCliente() {
    this.clienteService.save(this.modelRegistro).subscribe((cliente) => {
      this.modelRegistro = {};
      this.mostrar = 'inicio';
      Swal.fire({
        title: 'Usuario registrado!',
        text: 'Revise su email para validar la cuenta.',
        icon: 'success',
      });
    });
  }

  validarCuenta() {
    this.clienteService.validarCuenta(this.cliente._id, this.modelValidacion.codigo).subscribe((cliente) => {
      this.cliente = cliente;
      localStorage.setItem('cliente', JSON.stringify(cliente));
      this.mostrar = 'inicio';
      this.cerrarModal.nativeElement.click();
      Swal.fire({
        title: 'Usuario validado!',
        text: 'Ahora puede utilizar su cuenta.',
        icon: 'success',
      });
    });
  }

  validarMail() {
    return this.model.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  }

  toggle(view) {
    this.mostrar = view;
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
        this.cliente = null;
        localStorage.removeItem('cliente');
      }
    });
  }

  buscarEntradas() {
    this.entradaService.buscarEntradas(this.cliente.email).subscribe((entradas) => {
      this.entradas = entradas;
      console.log(entradas);
    });
  }

  verShow(id) {
    this.router.navigate([`/streaming/watch/${id}`]);
  }

  entradaVencida(entrada) {
    console.log((moment(entrada.inicio).isSameOrBefore(moment().toDate())) && (moment(entrada.fin).isSameOrAfter(moment().toDate())));
    return (moment(entrada.inicio).isSameOrBefore(moment().toDate())) && (moment(entrada.fin).isSameOrAfter(moment().toDate()));
  }
}
