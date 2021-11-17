import { Injectable } from '@angular/core';
import { BaseService } from '@services';
import { ResumoAtendimentoRenegociacaoContrato } from '../models/resumo-atendimento-renegociacao-contrato';
import { CoreUtils } from "../../../../../core/utils/CoreUtils";
import { ModelService as ServiceCliente } from '../../cliente/services/model.service';
import { Cliente } from "app/main/private/cliente/models/Cliente";


@Injectable()
export class ModelService extends BaseService {
    listModels: ResumoAtendimentoRenegociacaoContrato[];
    model: ResumoAtendimentoRenegociacaoContrato;

    constructor(serviceCliente: ServiceCliente) {
        super();

        this.page.size = 10;
        this.page.pageNumber = 0;

        CoreUtils.registerExternalService(
            {
                modelService: this,
                externalServices: [
                    { module: 'cliente', serviceCliente }
                ]
            }
        );
    }
    
    getBoletoByIdAtendimento = (result) => {

        this.serviceName = 'boletos';

        this.getAllFromPath('boletos/' + this.storage.retrieve('idAtendimento'))
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders();
                    this.setCurrentComponentResult(result, response);
                }
            });
    }

    public getDadosCliente = (result) => {
        this.serviceName = 'clientes';

        let currentClient = this.storage.retrieve('currentClient');

        this.getAllFromPath('clientes/' + currentClient.cpfCnpj)
            .subscribe((response: any) => {
                if (!response) {
                    return;
                }

                let cliente = Object.assign(new Cliente({}), response);

                cliente.ufAtual = response.enderecos[0]?.uf;
                cliente.bairroAtual = response.enderecos[0]?.bairro;
                cliente.cidadeAtual = response.enderecos[0]?.nomeLocalidade;
                cliente.emailAtual = response.emails[0]?.coComunicacao;
                cliente.telefoneAtual = response.telefones[0]?.coComunicacao;

                this.setCurrentComponentResult(result, cliente);
                console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
            });
    }
}
