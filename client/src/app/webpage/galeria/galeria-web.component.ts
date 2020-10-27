import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria-web',
  templateUrl: './galeria-web.component.html',
  styleUrls: ['./galeria-web.component.scss']
})
export class GaleriaWebComponent implements OnInit {

  ngOnInit(): void {

  }

  openGallery(id) {
    this.closeAll();
    const gallery = document.getElementById('gallery-' + id);
    const card = document.getElementById('card-' + id);
    gallery.classList.add('Gallery--active');
    card.classList.add('Card--active');
  }

  closeAll() {
    const galleryActv = document.querySelector('.Gallery--active');
    const cardActv = document.querySelector('.Card--active');
    if (galleryActv) {
      galleryActv.classList.remove('Gallery--active');
    }
    if (cardActv) {
      cardActv.classList.remove('Card--active');
    }
  }
}
