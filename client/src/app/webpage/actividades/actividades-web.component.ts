import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-actividades-web',
  templateUrl: './actividades-web.component.html',
  styleUrls: ['./actividades-web.component.scss'],
})

export class ActividadesWebComponent implements OnInit {

  actividades = [];

  constructor(
    private actividadesService: ActividadesService,
  ){}

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades() {
    this.actividadesService.findAll().subscribe((actividades) => {
      this.actividades = actividades;
    });
  }
}
