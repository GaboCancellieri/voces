import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ImagesService } from 'src/app/services/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-novedads',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss', '../../admin.component.scss']
})
export class NovedadesAdminComponent implements OnInit {

  anuncios;
  novedades;
  addAnuncio = false;
  addNovedad = false;
  editAnuncios = false;
  editNovedades = false;

  constructor(
    private imagenesService: ImagenesService,
    private imagesService: ImagesService,
  ) {}

  ngOnInit(): void {
    this.getImagenes();
  }

  getImagenes(): void {
    this.imagenesService.findAll().subscribe((imagenes) => {
      this.anuncios = imagenes.filter(i => i.tipo === 'anuncio');
      this.novedades = imagenes.filter(i => i.tipo === 'novedad');
    });
  }

  uploadAnuncios(event): void {
    const files = event.files;
    const anuncios = [];
    const formData: FormData = new FormData();
    for (const file of files) {
        const newAnuncio = {
          tipo: 'anuncio',
          imagen: file.name
        };
        const fileName = `Anuncio - ${file.name}`;
        formData.append('upload', file, fileName);
        anuncios.push(newAnuncio);
    }

    this.imagesService.uploadImages(formData, 'anuncios').subscribe((result) => {
      this.anuncios.push(...anuncios);
      for (const anuncio of anuncios) {
        this.imagenesService.save(anuncio).subscribe((anun) => {});
      }
    });
  }

  uploadNovedades(event): void {
    const files = event.files;
    const novedades = [];
    const formData: FormData = new FormData();
    for (const file of files) {
        const newNovedad = {
          tipo: 'novedad',
          imagen: file.name
        };
        const fileName = `Novedad - ${file.name}`;
        formData.append('upload', file, fileName);
        novedades.push(newNovedad);
    }

    this.imagesService.uploadImages(formData, 'novedades').subscribe((result) => {
      this.novedades.push(...novedades);
      for (const novedad of novedades) {
        this.imagenesService.save(novedad).subscribe((nov) => {});
      }
    });
  }

  deleteImagen(imagen) {
    const folder = (imagen.tipo === 'novedad') ? 'novedades' : 'anuncios';
    const nombre = (imagen.tipo === 'novedad') ? 'Novedad' : 'Anuncio';
    this.imagesService.deleteImage(folder, `${nombre} - ${imagen.imagen}`).subscribe((result) => {
      if (imagen.tipo === 'novedad') {
        this.novedades = this.novedades.filter(n => n.imagen !== imagen.imagen);
        this.imagenesService.delete(imagen._id).subscribe((img) => {
          Swal.fire({
            title: 'Novedad Eliminada!',
            text: 'La novedad se eliminó exitosamente.',
            icon: 'success',
          });
        });
      } else {
        this.anuncios = this.anuncios.filter(n => n.imagen !== imagen.imagen);
        this.imagenesService.delete(imagen._id).subscribe((img) => {
          Swal.fire({
            title: 'Anuncio Eliminado!',
            text: 'El anuncio se eliminó exitosamente.',
            icon: 'success',
          });
        });
      }
    });
  }
}
