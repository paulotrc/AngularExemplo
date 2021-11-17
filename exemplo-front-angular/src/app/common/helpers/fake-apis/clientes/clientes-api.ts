// Funcionalidade Incluir clientes corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import {Observable, of, throwError} from 'rxjs';
import {HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BaseApi} from '../base-api';
import {Api} from '../../interfaces/api';
import {ClientesMock} from '../../fake-db/mocks/clientes/ClientesMock';
import {f, g} from '../../decorators/index';
import {Get} from '../../decorators/route';
import {Params} from '../../decorators/params';
import {AtendimentosMock} from '../../fake-db/mocks/atendimentos/AtendimentosMock';


export class ClientesApi extends BaseApi<ClientesMock> implements Api<ClientesMock> {


    constructor() {
        super();
        this.resourceName =  'clientes';
    }

    doPost(): Observable<HttpEvent<ClientesMock>> {
        super.doPost('cpfCnpj');

        const newModel = { success: true };
        this.setMockResult( newModel );
        // respond 200 OK
        return of(new HttpResponse({status: 200, body: {message: 'ok'} }));
    }

    doGet(resourceValue: any = null): Observable<HttpEvent<ClientesMock>> {
        let newModel = this.getDataProviderList(ClientesMock.itens());

        if (resourceValue) {
            newModel = newModel.filter((item, index, arr) => {
                    const teste =  item.cpfCnpj === resourceValue;
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



    doDelete(id: any = null): Observable<HttpEvent<ClientesMock>> {

        const itens =  JSON.parse(localStorage.getItem('clientesList') );
        if ( itens !== null && itens.length > 0 && id !== null) {
            const xx =  itens.filter((item, index, arr)  => item.id !== +id);
            console.log('ITENS A:: ', xx );
            this.setMockResult( xx );
        }
        // respond 200 OK
        return of(new HttpResponse({status: 200, body: { success: true } }));
    }
}
