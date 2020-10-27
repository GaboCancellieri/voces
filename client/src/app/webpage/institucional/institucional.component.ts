import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/schemas/docente';
import { Institucional } from 'src/app/schemas/institucional';
import { InstitucionalService } from 'src/app/services/institucional.service';

@Component({
  selector: 'app-institucional-component',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional-web.component.scss']
})

export class InstitucionalComponent implements OnInit {

  institucional = new Institucional();
  directora: Docente;
  docentes: Docente[] = [];

  constructor(
    private institucionalService: InstitucionalService
  ) {}

  ngOnInit(): void {
    this.getInstitucional();
  }

  getInstitucional() {
    this.institucionalService.findAll().subscribe( ( institucional ) => {
      this.institucional = institucional[0];
      this.directora = institucional[0].docentes[0];
      institucional[0].docentes.shift();
      this.docentes = institucional[0].docentes;
    });
  }
}
