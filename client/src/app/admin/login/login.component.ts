import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class AdminLoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }

  login(): void {
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        this.router.navigateByUrl('admin-voces/inicio');
      },
      error => {
        this.messageService.add({key: 'tr', severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
      });
  }

  register(): void {
    const user = { username: this.username, password: this.password };
    this.userService.register(user).subscribe(
      data => {
        this.router.navigateByUrl('admin-voces/inicio');
      },
      error => {
        console.log(error);
      });
  }
}
