import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Show } from 'src/app/schemas/show';
import { ShowsService } from 'src/app/services/shows.service';

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

  constructor(
      private showsService: ShowsService,
      private router: Router,
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getShow();
  }

  getShow() {
    this.route.params.subscribe((params: any) => {
        this.showsService.findOne(params.idShow).subscribe((show) => {
            this.show = show;
            this.showAux = Object.assign(show);
            console.log(typeof show.fechaInicioEstreno);
            this.estados = this.estados.filter(estado => estado.nombre !== this.show.estado.nombre);
        });
    });
  }

  onSave() {

  }

  toggleEdit(condition) {
    this.edit = condition;
    if (!condition) {
      this.show = Object.assign(this.showAux);
    }
  }

  changeEstado() {

  }

  onCancel() {
      this.router.navigate(['/admin-voces/streaming']);
  }
}
