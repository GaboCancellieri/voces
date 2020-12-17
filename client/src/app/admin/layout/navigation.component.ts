import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() changeView = new EventEmitter();
  usuario;
  items;

  constructor(
    private userService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserLogged();
    this.items = [
      {
        label: 'anuncios/novedades',
        icon: 'fas fa-newspaper',
        link: '/admin-voces/novedades',
      },
      {
        label: 'institucional',
        icon: 'fas fa-university',
        link: '/admin-voces/institucional',
      },
      {
        label: 'areas',
        icon: 'fas fa-music',
        link: '/admin-voces/areas',
      },
      {
        label: 'actividades',
        icon: 'fas fa-microphone',
        link: '/admin-voces/actividades',
      },
      {
        label: 'streaming',
        icon: 'fas fa-video',
        link: '/admin-voces/streaming',
      },
      {
        label: 'galeria',
        icon: 'fas fa-photo-video',
        link: '/admin-voces/galeria',
      },
      {
        label: 'contacto',
        icon: 'fas fa-phone',
        link: '/admin-voces/contacto',
      },
      {
        label: 'Generar Entradas',
        icon: 'fas fa-ticket-alt',
        link: '/admin-voces/generarEntrada',
      },
    ];
  }

  getUserLogged(): void {
    this.usuario = this.userService.getUserLogged();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['admin-voces/login']);
  }

  changeComponent(label: string) {
    this.changeView.emit(label);
  }
}
