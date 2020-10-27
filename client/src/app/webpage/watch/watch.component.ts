import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/schemas/show';
import { EntradaService } from 'src/app/services/entradas.service';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
    // TMF6ibuPHb
    model: any = {};
    show: Show;

  constructor(
    private showsService: ShowsService,
    private entradaService: EntradaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getShow();
    // this.save();
  }

  getShow() {
    this.route.params.subscribe((params: any) => {
        this.showsService.findOne(params.idShow).subscribe((show) => {
            this.show = show;
            console.log(show);
        });
    });
  }

  verificarEntrada() {
      console.log(this.model);
      this.entradaService.verificar(this.show._id, this.model.email, this.model.codigo).subscribe((entrada) => {
          console.log(entrada);
      });
  }
}
