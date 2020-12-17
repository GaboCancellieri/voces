import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { UrlService } from '../window.provider.service';
import { Observable } from 'rxjs';
import { Options } from '../shared/options';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EmailService extends CrudService<any, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
      super(http, '/email', urlService);
    }

  enviarMail(params, options: Options = this.defaultOptions): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/email/send`, params).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }
}
