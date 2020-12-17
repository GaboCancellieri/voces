import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Imagen } from '../schemas/imagen';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Options } from '../shared/options';
import { UrlService } from '../window.provider.service';

@Injectable()
export class ImagenesService extends CrudService<Imagen, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/imagenes', urlService);
  }


  getImagenesTipo(tipo: string, options: Options = this.defaultOptions): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/imagenes/tipo/${tipo}`).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }
}
