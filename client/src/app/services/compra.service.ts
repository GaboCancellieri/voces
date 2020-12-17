import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Options } from '../shared/options';
import { Observable } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { UrlService } from '../window.provider.service';
import { Compra } from '../schemas/compra';

@Injectable()
export class CompraService extends CrudService<Compra, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/compras', urlService);
  }

  getIdentificationTypes(options: Options = this.defaultOptions): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/mercadopago/identificationTypes`, {}).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }

  comprarEntrada(params, options: Options = this.defaultOptions): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/mercadopago/comprarEntrada`, params).pipe(
        timeout(5000),
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }

  crearPreferencia(params, options: Options = this.defaultOptions): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/mercadopago/preferencia`, params).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }
}
