import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Actividad } from '../schemas/actividad';
import { UrlService } from '../window.provider.service';

@Injectable()
export class ActividadesService extends CrudService<Actividad, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/actividades', urlService);
  }

}
