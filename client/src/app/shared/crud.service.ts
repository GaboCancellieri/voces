import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  public baseURL = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    protected base: string
  ) {}

  save(t: T): Observable<T> {
    return this.http.post<T>(this.baseURL + this.base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.patch<T>(this.baseURL + this.base + '/' + id, t, {});
  }

  findOne(id: ID): Observable<any> {
    return this.http.get<any>(this.baseURL + this.base + '/' + id).pipe(
      map((res: any) => this.parse(res)),
    );
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseURL + this.base);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.baseURL + this.base + '/' + id);
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
}
