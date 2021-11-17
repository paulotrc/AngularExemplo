// Funcionalidade Incluir contratos corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import {Observable, of} from 'rxjs';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {BaseApi} from '../base-api';
import {Api} from '../../interfaces/api';
import {ExemploMock} from '../../fake-db/mocks/exemplo/ExemploMock';

export class ExemplosApi extends BaseApi<ExemploMock> implements Api<ExemploMock> {
    constructor() {
        super();
        this.resourceName =  'exemplo';
    }

    doPost(): Observable<HttpEvent<ExemploMock>> {

        // get new model object from post body
        const newModel = { success: true };
        // save new model
        // this.modelList.push(openContrato);
        this.setMockResult( newModel );
        // respond 200 OK
        return of(new HttpResponse({status: 200, body: newModel }));

    }

    doGet(id: any = null): Observable<HttpEvent<ExemploMock>> {
        let newModel = this.getDataProviderList(ExemploMock.itens());
        // get new model object from post body
        newModel = this.paginateDataprovider(newModel);
        const response = new HttpResponse({status: 200, body: newModel});
        // respond 200 OK
        return of(response);
    }

    doDelete(id: any = null): Observable<HttpEvent<ExemploMock>> {

        const itens =  JSON.parse(localStorage.getItem('exemploList') );
        console.log('PPPPPP ', id, itens.length, ( itens !== null && itens.length > 0 && id !== null));

        if ( itens !== null && itens.length > 0 && id !== null) {
            const xx =  itens.filter((item, index, arr)  => item.id !== +id);
            console.log('ITENS A:: ', xx );
            this.setMockResult( xx );
        }


        // get new model object from post body
        const newModel = { success: true };
        // this.modelList.push(openContrato);

        // respond 200 OK
        return of(new HttpResponse({status: 200, body: newModel }));

    }
}
