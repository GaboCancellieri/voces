import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/schemas/show';
import { EntradaService } from 'src/app/services/entradas.service';
import { ShowsService } from 'src/app/services/shows.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
    model: any = {};
    show: Show;
    verShow = false;

  constructor(
    private showsService: ShowsService,
    private entradaService: EntradaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.verificarRuta();
  }

  verificarRuta() {
    this.route.params.subscribe((params: any) => {
      this.getShow(params.idShow, params.email, params.codigo);
    });
  }

  getShow(idShow: string, email: string, codigo: string) {
    this.showsService.findOne(idShow).subscribe((show) => {
        this.show = show;
        if (show.estado.nombre !== 'Gratis') {
          this.linkDirecto(email, codigo);
        } else {
          this.verShow = true;
        }
        if (!this.show.link) {
          Swal.fire({
            title: 'No estamos listos',
            text: `El show no está listo todavía, puede probar en unos minutos`,
            imageUrl: 'https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/18_Closed_Sign-256.png',
            imageHeight: 90,
            imageAlt: 'entrada',
            confirmButtonColor: '#FC01A0',
          });
          this.goToHome();
        }
    });
  }

  linkDirecto(email, codigo) {
    console.log(email);
    console.log(codigo);
    if (email && codigo) {
      this.model.email = email;
      this.model.codigo = codigo;
      this.verificarEntrada();
    }
  }

  goToHome() {
    this.router.navigate(['/streaming']);
  }

  verificarEntrada() {
      this.model.email = this.model.email.trim().toLowerCase();
      this.model.codigo = this.model.codigo.trim();
      const mailValido = this.validarMail();
      if (mailValido) {
        this.entradaService.verificar(this.show._id, this.model.email, this.model.codigo).subscribe((entrada) => {
            Swal.fire({
              title: '¿Está seguro?',
              text: `Una vez utilizada la entrada para el show, la misma se desactivará, es decir, no podrá reutilizar esta entrada.
              Asegúrese de disponer de una conexión estable y no cierre su navegador antes de terminar de ver el show.`,
              imageUrl: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/ticket.png',
              imageHeight: 90,
              imageAlt: 'entrada',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Entrar',
              confirmButtonColor: '#FC01A0',
              cancelButtonColor: '#444444',
            }).then((result) => {
              if (result.isConfirmed) {
                entrada.activa = false;
                this.entradaService.update(entrada._id, entrada).subscribe((entradaGuardada) => {
                  this.verShow = true;
                });
              }
            });
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

  getLink() {
    return this.show.link;
  }

  validarMail() {
    return this.model.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  }
}
