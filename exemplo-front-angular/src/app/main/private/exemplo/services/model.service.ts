import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resolve} from '@angular/router';
import {Exemplo} from '../models/Exemplo';
import {BaseService} from '@services';


@Injectable()
export class ModelService extends BaseService implements Resolve<any> {
    listModels: Exemplo[];
    model: Exemplo;

    constructor(
        private httpClient: HttpClient
    ) {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------






}
