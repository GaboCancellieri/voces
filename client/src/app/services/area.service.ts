import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Area } from '../schemas/area';
import { UrlService } from '../window.provider.service';

@Injectable()
export class AreaService extends CrudService<Area, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/areas', urlService);
  }

}
