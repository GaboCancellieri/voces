import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Options } from './options';
import Swal from 'sweetalert2';
import { UrlService } from '../window.provider.service';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  private headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  public baseURL = this.urlService.getRestApiUrl();
  defaultOptions: Options = { params: null, showError: true, showLoader: true };

  constructor(
    protected http: HttpClient,
    protected base: string,
    protected urlService: UrlService,
  ) { }

  save(t: T, options: Options = this.defaultOptions): Observable<T> {
    return this.http.post<T>(this.baseURL + this.base, t).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
      );
  }

  update(id: ID, t: T, options: Options = this.defaultOptions): Observable<T> {
    return this.http.patch<T>(this.baseURL + this.base + '/' + id, t).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
      );
  }

  findOne(id: ID, options: Options = this.defaultOptions): Observable<any> {
    return this.http.get<any>(this.baseURL + this.base + '/' + id).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
      );
  }

  findAll(options: Options = this.defaultOptions): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL + this.base).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
      );
  }

  delete(id: ID, options: Options = this.defaultOptions): Observable<T> {
    return this.http.delete<T>(this.baseURL + this.base + '/' + id).pipe(
      map((res: any) => this.parse(res)),
      catchError((err: any) => this.handleError(err, options))
      );
  }

  public parse(data: any): any {
    const dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;
    const dateNet = /\/Date\((-?\d+)(?:-\d+)?\)\//i;
    const traverse = (o, func) => {
        for (const i of Object.keys(o)) {
            o[i] = func.apply(this, [i, o[i]]);
            if (o[i] !== null && typeof (o[i]) === 'object') {
                traverse(o[i], func);
            }
        }
    };
    const replacer = (key, value) => {
        if (typeof (value) === 'string') {
            if (dateISO.test(value)) {
                return new Date(value);
            }
            if (dateNet.test(value)) {
                return new Date(parseInt(dateNet.exec(value)[1], 10));
            }
        }
        return value;
    };
    if (typeof data === 'object') {
        traverse(data, replacer);
    }
    return data;

}

public handleError(response: any, options: Options) {
  console.log(response);
  let message;
  if (response.error && response.error.message) {
      message = response.error.message;
  } else if (response.message === 'Timeout has occurred') {
      message = 'Timeout';
  } else {
      message = 'La aplicación no pudo comunicarse con el servidor. Por favor revise su conexión a la red.';
  }

  if (!options || options.showError || (options.showError === undefined)) {
      // El código 400 es usado para enviar mensaje de validación al usuario
      if (response.status === 400) {
        Swal.fire({
          icon: (response.error.imageUrl) ? null : 'error',
          title: response.error.title || 'Error',
          text: message,
          imageUrl: response.error.imageUrl || null,
          imageHeight: response.error.imageHeight || null,
          confirmButtonColor: '#FC01A0',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo conectar con el servidor!',
          text: message,
          confirmButtonColor: '#FC01A0',
        });
      }
  }
  return throwError(message);
}
}
