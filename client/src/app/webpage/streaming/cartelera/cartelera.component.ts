import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from 'src/app/schemas/show';
import { ShowsService } from 'src/app/services/shows.service';
@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {

  @Output() realizarCompra = new EventEmitter();
  showsEstreno: Show[];
  showsCompra: Show[];
  showsGratis: Show[];
  allShows: Show[];
  allShowsAux: Show[];
  selectedShow: Show;

  constructor(
    private showsService: ShowsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getShows();
  }

  getShows() {
    this.showsService.findAll().subscribe((shows) => {
      this.showsEstreno = shows.filter(s => s.estado.nombre.toLowerCase() === 'estreno');
      this.showsCompra = shows.filter(s => s.estado.nombre.toLowerCase() === 'comprar');
      this.showsGratis = shows.filter(s => s.estado.nombre.toLowerCase() === 'gratis');
      this.allShows = [...this.showsEstreno, ...this.showsCompra, ...this.showsGratis];
      this.allShowsAux = Object.assign(this.allShows);
    });
  }

  actionShow(show) {
    if (show.estado.nombre === 'Gratis') {
      this.router.navigate([`/streaming/watch/${show._id}`]);
    } else {
      this.realizarCompra.emit(show);
    }
  }

  verDetalle(show) {
    this.allShows = Object.assign(this.allShowsAux);
    this.selectedShow = show;
    this.allShows = this.allShows.filter(s => s._id !== this.selectedShow._id);
  }

  unselect() {
    this.allShows = Object.assign(this.allShowsAux);
    this.selectedShow = null;
  }
}
