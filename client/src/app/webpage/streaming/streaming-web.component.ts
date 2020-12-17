import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/schemas/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-streaming-web',
  templateUrl: './streaming-web.component.html',
  styleUrls: ['./streaming-web.component.scss']
})
export class StreamingWebComponent implements OnInit {
  @ViewChild('iniciarSesion') botonIniciarSesion: ElementRef;
  @ViewChild('close') cerrarModal: ElementRef;

  model: any = {};
  modelRegistro: any = {};
  modelValidacion: any = {};
  cliente: Cliente;
  mostrar = 'inicio';

  constructor(
    private clienteService: ClienteService,
  )
  {}

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      this.cliente = JSON.parse(cliente);
    }
  }

  iniciarSesion() {
    this.model.email = this.model.email.trim().toLowerCase();
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

  onLogout() {
    localStorage.removeItem('cliente');
    this.cliente = null;
  }

  registrarCliente() {
    this.modelRegistro.email = this.modelRegistro.email.trim().toLowerCase();
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

  realizarCompra(show) {
      this.botonIniciarSesion.nativeElement.click();
  }
}
