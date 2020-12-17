import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'app-admin-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss', '../../admin.component.scss']
})
export class StreamingAdminComponent implements OnInit {
  shows = [];
  selectedShow;
  edit = false;
  cols: any[];

  constructor(
    private showService: ShowsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio Entrada' },
      { field: 'estado', header: 'Estado' },
      { field: 'estreno', header: 'Fechas Disponible' },
    ];

    this.getShows();
  }

  getShows() {
    this.showService.findAll().subscribe((shows) => {
      console.log(shows);
      this.shows = shows;
    });
  }

  onAdd() {
    this.router.navigate([`/admin-voces/streaming/show`]);
  }

  verDetalle() {
    this.router.navigate([`/admin-voces/streaming/show/${this.selectedShow._id}`]);
  }
}
