// Funcionalidade Incluir contratos corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseApi } from '../base-api';
import { Api } from '../../interfaces/api';
import { ContratosMock } from '../../fake-db/mocks/contratos/ContratosMock';
import {AtendimentosMock} from '../../fake-db/mocks/atendimentos/AtendimentosMock';

export class ContratosApi extends BaseApi<ContratosMock> implements Api<ContratosMock> {

    constructor() {
        super();
        this.resourceName = 'contratos';
    }

    doPost(): Observable<HttpEvent<ContratosMock>> {
        super.doPost('idContrato');
        const newModel = { success: true };
        this.setMockResult(newModel);
        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: newModel }));
    }

    doGet(resourceValue: any = null): Observable<HttpEvent<ContratosMock>> {

        let newModel = this.getDataProviderList(ContratosMock.itens());

        if (resourceValue) {
            newModel = newModel.filter((item, index, arr) =>  {
                const teste =  item.cpfCnpj === resourceValue;
                return  teste;
            });
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



    doDelete(id: any = null): Observable<HttpEvent<ContratosMock>> {

        const itens = JSON.parse(localStorage.getItem('contratosList'));
        if (itens !== null && itens.length > 0 && id !== null) {
            const xx = itens.filter((item, index, arr) => item.id !== +id);
            console.log('ITENS A:: ', xx);
            this.setMockResult(xx);
        }
        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: { success: true } }));
    }
}
