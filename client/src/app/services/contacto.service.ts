import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { UrlService } from '../window.provider.service';

@Injectable()
export class ContactoService extends CrudService<Contacto, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/contacto', urlService);
  }

}
