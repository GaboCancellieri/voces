import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto-web',
  templateUrl: './contacto-web.component.html',
  styleUrls: ['./contacto-web.component.scss']
})
export class ContactoWebComponent implements OnInit {
  model: any = {};
  sendingMail = false;

  constructor(
    private emailService: EmailService,
  ) {

  }

  ngOnInit(): void {

  }

  validarMail() {
    return this.model.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  }

  enviarMail() {
    if (this.model.email) {
      this.sendingMail = true;
      this.emailService.enviarMail(this.model).subscribe((mail) => {
        Swal.fire({
          title: 'Consulta Envidada',
          text: 'Su consulta ha sido enviada exitosamente.',
          imageUrl: 'https://cdn3.iconfinder.com/data/icons/finance-152/64/16-256.png',
          imageHeight: 90,
          imageAlt: 'mail enviado',
          confirmButtonColor: '#FC01A0',
        });
        this.model = {};
        this.sendingMail = false;
      });
    }
  }
}
