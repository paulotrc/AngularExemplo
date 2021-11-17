import { Injectable } from '@angular/core';
import { Campanha } from '../models/Campanha';
import { BaseService } from '@services';
import * as _ from 'lodash';

@Injectable()
export class ModelService extends BaseService {
    listCampanha: Campanha[] = [];
    modelCampanha: Campanha;

    constructor() {
        super();

        this.page.size = 10;
        this.page.pageNumber = 0;
    }
}
