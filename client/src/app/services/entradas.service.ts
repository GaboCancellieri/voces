import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Entrada } from '../schemas/entrada';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EntradaService extends CrudService<Entrada, string> {

  constructor(protected http: HttpClient) {
    super(http, '/entradas');
  }

  verificar(idShow: string, email: string, codigo: string): Observable<Entrada> {
    const params = {
        email,
        codigo
    };
    return this.http.get<any>(`${this.baseURL}/verificar/entrada/${idShow}`, { params }).pipe(
        map((res: any) => this.parse(res)),
      );
  }
}
