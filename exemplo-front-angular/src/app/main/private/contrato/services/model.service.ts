import {Injectable} from '@angular/core';
import {BaseService} from '@services';
import {Contrato} from '../models/contrato';

@Injectable()
export class ModelService extends BaseService  {
  listModels: Contrato[];
  model: Contrato;

  constructor() {
    super();

    this.page.size = 10;
    this.page.pageNumber = 0;

  }
}
