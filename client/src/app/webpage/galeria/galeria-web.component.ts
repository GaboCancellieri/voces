import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/schemas/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-galeria-web',
  templateUrl: './galeria-web.component.html',
  styleUrls: ['./galeria-web.component.scss']
})
export class GaleriaWebComponent implements OnInit {

  albums: Album[];
  auxAlbums: Album[];
  selectedAlbum = null;
  images = [];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  constructor(
    private albumsService: AlbumService,
  ) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumsService.findAll().subscribe((albums) => {
      this.albums = albums;
      this.auxAlbums = Object.assign(albums);
    });
  }

  selectAlbum(album) {
    this.albums = this.albums.filter( a => a._id !== album._id);
    this.images = [];
    this.selectedAlbum = album;
    for (const imagen of album.imagenes) {
      this.images.push({
        previewImageSrc: '../../../assets/img/galeria/' + imagen,
        thumbnailImageSrc: '../../../assets/img/galeria/' + imagen,
        alt: '',
        title: ''
      });
    }
  }

  unselectAlbum() {
    this.albums = Object.assign(this.auxAlbums);
    this.selectedAlbum = null;
    this.images = [];
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
