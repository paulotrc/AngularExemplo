// Funcionalidade Incluir contratos corresponde a essa API com a sua model ContrataConsignadoSERPROV2

import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseApi } from '../base-api';
import { Api } from '../../interfaces/api';
import { AtendimentosMock } from '../../fake-db/mocks/atendimentos/AtendimentosMock';

export class AtendimentosApi extends BaseApi<AtendimentosMock> implements Api<AtendimentosMock> {
    constructor() {
        super();
        this.resourceName = 'atendimentos';
    }

    doPost(): Observable<HttpEvent<AtendimentosMock>> {
        super.doPost('id');
        const newModel = { success: true };
        this.setMockResult(newModel);
        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: newModel }));
    }

    doGet(resourceValue: any = null): Observable<HttpEvent<AtendimentosMock>> {
        let newModel = this.getDataProviderList(AtendimentosMock.itens());
        if (resourceValue) {
            newModel = newModel.filter((item, index, arr) => item.cpfCnpj === resourceValue);
        }
        newModel = this.paginateDataprovider(newModel);
        const response = new HttpResponse({ status: 200, body: newModel });
        // respond 200 OK
        return of(response);
    }



    doDelete(id: any = null): Observable<HttpEvent<AtendimentosMock>> {

        const itens = JSON.parse(localStorage.getItem('atendimentosList'));
        if (itens !== null && itens.length > 0 && id !== null) {
            const xx = itens.filter((item, index, arr) => item.id !== +id);
            console.log('ITENS A:: ', xx);
            this.setMockResult(xx);
        }
        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: { success: true } }));
    }
}
