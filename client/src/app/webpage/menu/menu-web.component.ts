import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-web',
  templateUrl: './menu-web.component.html',
  styleUrls: ['./menu-web.component.scss']
})
export class MenuWebComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  getRutaContacto(){
    const cleanUrl = this.router.url.replace('#institucional', '');
    return cleanUrl.replace('#contacto', '') + '#contacto';
  }
}
