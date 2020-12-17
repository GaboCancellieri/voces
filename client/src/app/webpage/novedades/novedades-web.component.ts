import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-novedades-web',
  templateUrl: './novedades-web.component.html',
  styleUrls: ['./novedades-web.component.scss']
})
export class NovedadesWebComponent implements OnInit {

  novedades = [];

  constructor(
    private imagenesService: ImagenesService,
  )
  {}

  ngOnInit(): void {
    this.getNovedades();
  }

  getNovedades() {
    this.imagenesService.getImagenesTipo('novedad').subscribe((novedades) => {
      this.novedades = novedades;
    });
  }
}
