import {Injectable} from '@angular/core';
import {Sample} from '../models/Sample';
import {BaseService} from '@services';

@Injectable()
export class ModelService  extends BaseService  {
  listModels: Sample[];
  model: Sample;


  constructor() {
    super();
  }
}
