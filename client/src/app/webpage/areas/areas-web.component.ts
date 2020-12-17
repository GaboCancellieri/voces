import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/schemas/area';
import { Institucional } from 'src/app/schemas/institucional';
import { AreaService } from 'src/app/services/area.service';
import { InstitucionalService } from 'src/app/services/institucional.service';

@Component({
  selector: 'app-areas-web',
  templateUrl: './areas-web.component.html',
  styleUrls: ['./areas-web.component.scss'],
})

export class AreasWebComponent implements OnInit {

  institucional = new Institucional();
  areas: Area[];

  constructor(
    private areaService: AreaService,
    private institucionalService: InstitucionalService,
    ){}

  ngOnInit(): void {
    this.getInstitucional();
    this.getAreas();
  }

  getInstitucional(): void {
    this.institucionalService.findAll().subscribe(( institucional ) => {
      this.institucional = institucional[0];
    });
  }

  getAreas(): void {
    this.areaService.findAll().subscribe(( areas ) => {
      this.areas = areas;
    });
  }
}
