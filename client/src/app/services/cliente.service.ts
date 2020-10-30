import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Cliente } from '../schemas/cliente';
import { Options } from '../shared/options';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClienteService extends CrudService<Cliente, string> {

  constructor(protected http: HttpClient) {
    super(http, '/clientes');
  }

  iniciarSesion(email: string, password: string, options: Options = this.defaultOptions): Observable<Cliente> {
    const params = {
        email,
        password
    };
    return this.http.post<any>(`${this.baseURL}/iniciar/cliente`, { params }).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }

  validarCuenta(email: string, codigo: string, options: Options = this.defaultOptions): Observable<Cliente> {
    const params = {
        codigo
    };
    return this.http.patch<any>(`${this.baseURL}/validar/cliente/${email}`, { params }).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }
}
