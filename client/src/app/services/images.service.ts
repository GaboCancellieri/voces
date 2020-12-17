import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Options } from '../shared/options';
import { UrlService } from '../window.provider.service';

@Injectable()
export class ImagesService extends CrudService<any, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,

    ) {
    super(http, '/images', urlService);
  }

  uploadImages(formData: FormData, param: string, options: Options = this.defaultOptions): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/images/${param}`, formData).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }

  deleteImage(folder: string, imageName: string, options: Options = this.defaultOptions): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/images/${folder}/${imageName}`).pipe(
        map((res: any) => this.parse(res)),
        catchError((err: any) => this.handleError(err, options))
    );
  }
}
