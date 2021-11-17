import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Atendimento} from '../models/Atendimento';
import {BaseService} from '@services';
import { CoreUtils } from '../../../../../core/utils/CoreUtils';

@Injectable({
    providedIn: 'root'
})
export class ModelService extends BaseService implements Resolve<any> {
    listModels: Atendimento[];
    model: Atendimento;

    constructor() {
        super();
    }

    // Busca os 5 ultimos atendimentos do usuário logado
    getMeusAtendimentos = (result) => {

        // console.warn('[External Service] 3 - @Dev, aqui é onde o serviço externo chama a API');

        this.serviceName = 'meus-atendimentos';
        this.page.size = 5;

        this.getAllFromPath('meus-atendimentos')
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders(); // Isso é pra pegar o paginator automaticamente
                    this.setCurrentComponentResult( result, response);
                    console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    }

    // Busca atendimentos atraves do cpf ou cnpj informado no input do formgroup
    getAtendimentosByCpfCnpj = (obj) => {

        this.serviceName = 'meus-atendimentos';
        this.page.size = 5;

        this.getAllFromPath('meus-atendimentos/' + obj.cpfCnpj)
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders();
                    CoreUtils.mainComponent.modelService.currentComponent[obj.result] = response;
                }
            });
    }
}
