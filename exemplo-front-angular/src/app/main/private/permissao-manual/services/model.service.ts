import {Injectable} from '@angular/core';
import {PermissaoManual} from '../models/PermissaoManual';
import {BaseService} from '@services';

@Injectable()
export class ModelService  extends BaseService  {
  listModels: PermissaoManual[];
  model: PermissaoManual;


  constructor() {
    super();
  }
}
