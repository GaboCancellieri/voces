import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Album } from '../schemas/album';
import { UrlService } from '../window.provider.service';

@Injectable()
export class AlbumService extends CrudService<Album, string> {

  constructor(
    protected http: HttpClient,
    protected urlService: UrlService,
    ) {
    super(http, '/albums', urlService);
  }
}
