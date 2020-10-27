import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud.service';
import { Docente } from '../schemas/docente';

@Injectable()
export class DocenteService extends CrudService<Docente, string> {

  constructor(protected http: HttpClient) {
    super(http, '/docente');
  }

}
