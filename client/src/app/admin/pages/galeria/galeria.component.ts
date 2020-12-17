import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Album } from 'src/app/schemas/album';
import { AlbumService } from 'src/app/services/album.service';
import { ImagesService } from 'src/app/services/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss', '../../admin.component.scss']
})
export class GaleriaAdminComponent implements OnInit {

  model = new Album();
  albums: Album[] = [];
  selectedAlbum: Album;
  cols: any[];
  add = false;
  edit = false;
  position: string;
  msgs: Message[] = [];

  constructor(
    private albumService: AlbumService,
    private imagesService: ImagesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getAlbums();
    this.cols = [
      { field: 'titulo', header: 'Titulo' },
    ];
  }


  getAlbums(): void {
    this.albumService.findAll().subscribe( ( albums ) => {
      this.albums = albums;
    });
  }

  save(): void {
    this.albumService.save(this.model).subscribe( (album) => {
      this.add = false;
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Contenido Guardado!',
      detail: 'El contenido se guardó exitosamente'});
    });
  }

  updateAlbum(): void {
    this.albumService.update(this.selectedAlbum._id, this.selectedAlbum).subscribe( (album) => {
      this.toggleEdit();
      this.clear();
      this.messageService.add({key: 'tr', severity: 'success',
      summary: 'Album Guardada!',
      detail: 'El album se guardó exitosamente'});
    });
  }

  deleteAlbum(position: string): void {
    this.position = position;
    this.confirmationService.confirm({
        message: 'Seguro que quiere eliminar el album?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.albumService.delete(this.selectedAlbum._id).subscribe( (album) => {
            this.albums = this.albums.filter( a => a._id !== this.selectedAlbum._id);
            this.messageService.add({key: 'tr', severity: 'success',
            summary: 'Album Eliminado!', detail: 'El album se eliminó exitosamente'});
            this.selectedAlbum = null;
          });
        },
        key: 'positionDialog'
    });
  }

  onAdd(): void {
    this.add = true;
    this.selectedAlbum = null;
  }

  selectAlbum(): void {
    this.add = false;
  }

  toggleEdit(): void {
    this.edit = !this.edit;
  }

  clear(): void {
    this.messageService.clear();
  }

  deleteImage(imagen): void {
    this.imagesService.deleteImage('galeria', imagen).subscribe((result) => {
      this.selectedAlbum.imagenes = this.selectedAlbum.imagenes.filter( i => i !== imagen);
      this.albumService.update(this.selectedAlbum._id, this.selectedAlbum).subscribe((album) => {

      });
    });
  }

  myUploader(event): void {
    const files = event.files;
    const fileNames = [];
    const formData: FormData = new FormData();
    for (const file of files) {
        const fileName = `${this.selectedAlbum.titulo} - ${file.name}`;
        formData.append('upload', file, fileName);
        fileNames.push(fileName);
    }

    this.imagesService.uploadImages(formData, 'galeria').subscribe((result) => {
      console.log(result);
      this.selectedAlbum.imagenes.push(...fileNames);
      this.albumService.update(this.selectedAlbum._id, this.selectedAlbum).subscribe((album) => {
        Swal.fire({
          title: 'Subida Exitosa!',
          text: 'Las imágenes se subieron exitosamente.',
          icon: 'success',
        });
      });
    });
  }
}
