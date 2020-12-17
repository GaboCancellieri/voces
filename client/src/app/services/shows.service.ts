import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from '../schemas/show';
import { CrudService } from '../shared/crud.service';
import { UrlService } from '../window.provider.service';

@Injectable()
export class ShowsService extends CrudService<Show, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/shows', urlService);
  }

}
