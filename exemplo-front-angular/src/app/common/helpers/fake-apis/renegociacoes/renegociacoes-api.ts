// Funcionalidade Incluir contratos corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseApi } from '../base-api';
import { Api } from '../../interfaces/api';
import { ContratosMock } from '../../fake-db/mocks/contratos/ContratosMock';
import {ResumoAtendimentoRenegociacaoContratoMock} from '../../fake-db/mocks/renegociacoes/ResumoAtendimentoRenegociacaoContratoMock';

export class RenegociacoesApi extends BaseApi<ResumoAtendimentoRenegociacaoContratoMock> implements Api<ResumoAtendimentoRenegociacaoContratoMock> {

    constructor() {
        super();
        this.resourceName = 'renegociacoes';
    }

    doPost(resourceValue): Observable<HttpEvent<ResumoAtendimentoRenegociacaoContratoMock>> {
        super.doPost('id');
        const newModel = { success: true };
        this.setMockResult(newModel, 'POST' );
        // respond 200 OK
        this.response = new HttpResponse({status: 200, body: newModel});
        return of(this.response);
    }

    doGet(resourceValue: any = null): Observable<HttpEvent<ResumoAtendimentoRenegociacaoContratoMock>> {

        let newModel = this.getDataProviderList(ResumoAtendimentoRenegociacaoContratoMock.itens());

        if (resourceValue) {
            newModel = newModel.filter((item, index, arr) =>  {
                const teste =  item.idAtendimento === resourceValue;
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



    doDelete(id: any = null): Observable<HttpEvent<ResumoAtendimentoRenegociacaoContratoMock>> {

        const itens = JSON.parse(localStorage.getItem('resumoAtendimentoRenegociacaoContratoList'));
        if (itens !== null && itens.length > 0 && id !== null) {
            const xx = itens.filter((item, index, arr) => item.id !== +id);
            console.log('ITENS A:: ', xx);
            this.setMockResult(xx);
        }
        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: { success: true } }));
    }
}
