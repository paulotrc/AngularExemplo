// Funcionalidade Incluir contratos corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import {Observable, of} from 'rxjs';
import {HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BaseApi} from '../base-api';
import {Api} from '../../interfaces/api';
import {BoletosMock} from '../../fake-db/mocks/boletos/BoletosMock';


export class BoletosApi extends BaseApi<BoletosMock> implements Api<BoletosMock> {
    constructor() {
        super();
        this.resourceName =  'samples';
    }

    doPost(): Observable<HttpEvent<BoletosMock>> {
        super.doPost('nossoNumero');
        const newModel = { success: true };
        this.setMockResult( newModel );
        // respond 200 OK
        return of(new HttpResponse({status: 200, body: newModel }));
    }

    doGet(resourceValue: any = null): Observable<HttpEvent<BoletosMock>> {
          let newModel = this.getDataProviderList(BoletosMock.itens());

          if (resourceValue) {
            newModel = newModel.filter((item, index, arr) => {
                    const teste =  item.nossoNumero === resourceValue;
                    return teste;
                }
            )[0];
        }


          if (newModel === null || newModel === undefined) {
            this.response = new HttpResponse({status: 404,  body: null } );
        } else {
            if (Array.isArray(newModel)) {
                newModel = this.paginateDataprovider(newModel);
            }
            this.response = new HttpResponse({status: 200, body: newModel});
        }
        // respond 200 OK
          return of(this.response);
    }



    doDelete(id: any = null): Observable<HttpEvent<BoletosMock>> {

        const itens =  JSON.parse(localStorage.getItem('samplesList') );
        if ( itens !== null && itens.length > 0 && id !== null) {
            const xx =  itens.filter((item, index, arr)  => item.nossoNumero + '' !== id + '');
            console.log('ITENS A:: ', xx );
            this.setMockResult( xx );
        }
        // respond 200 OK
        return of(new HttpResponse({status: 200, body: { success: true } }));
    }
}
