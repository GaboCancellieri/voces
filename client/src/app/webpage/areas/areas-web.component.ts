import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/schemas/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-areas-web',
  templateUrl: './areas-web.component.html',
  styleUrls: ['./areas-web.component.scss'],
})

export class AreasWebComponent implements OnInit {

  areas: Area[];

  constructor(
    private areaService: AreaService,
  ){}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas() {
    this.areaService.findAll().subscribe( ( areas ) => {
      this.areas = areas;
    });
  }
}
