import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-menu-web',
  templateUrl: './menu-web.component.html',
  styleUrls: ['./menu-web.component.scss']
})
export class MenuWebComponent implements OnInit {

  anuncios = [];

  constructor(
    private router: Router,
    private imagenesService: ImagenesService,
  ) {}

  ngOnInit(): void {
    this.getAnuncios();
  }

  getAnuncios(): void {
    this.imagenesService.getImagenesTipo('anuncio').subscribe((anuncios) => {
      this.anuncios = anuncios;
    });
  }

  getRutaContacto(){
    const cleanUrl = this.router.url.replace('#institucional', '');
    return cleanUrl.replace('#contacto', '') + '#contacto';
  }
}
