import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Institucional } from '../schemas/institucional';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class InstitucionalService extends CrudService<Institucional, string> {

  constructor(protected http: HttpClient) {
    super(http, '/institucional');
  }

}
