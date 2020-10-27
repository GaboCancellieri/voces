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
      { field: 'estreno', header: 'Ultimo Estreno' },
    ];

    this.getShows();
  }

  getShows() {
    this.showService.findAll().subscribe((shows) => {
      console.log(shows);
      this.shows = shows;
    });
  }

  selectShow() {

  }

  onAdd() {

  }

  verDetalle() {
    this.router.navigate([`/admin-voces/streaming/${this.selectedShow._id}`]);
  }
}
