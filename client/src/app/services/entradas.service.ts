import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Entrada } from '../schemas/entrada';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Options } from '../shared/options';
import { UrlService } from '../window.provider.service';

@Injectable()
export class EntradaService extends CrudService<Entrada, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/entradas', urlService);
  }

  buscarEntradas(email, options: Options = this.defaultOptions): Observable<Entrada[]> {
    const params = {
      email,
    };
    return this.http.get<any>(`${this.baseURL}/entradas`, { params }).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
    );
  }

  crearEntradas(entradasCompradas, options: Options = this.defaultOptions): Observable<Entrada[]> {
    return this.http.post<any>(`${this.baseURL}/entradas`, entradasCompradas).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
    );
  }

  verificar(idShow: string, email: string, codigo: string, options: Options = this.defaultOptions): Observable<Entrada> {
    const params = {
        email,
        codigo
    };
    return this.http.get<any>(`${this.baseURL}/verificar/entrada/${idShow}`, { params }).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
      );
  }
}
