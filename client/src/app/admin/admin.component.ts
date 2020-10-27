import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mostrar = 'inicio';

  constructor() {}

  ngOnInit(): void {

  }

  changeView(value: string){
    this.mostrar = value || 'inicio';
  }
}
