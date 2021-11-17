import {Injectable} from '@angular/core';
import {Cliente} from '../models/Cliente';
import {ModelService as ServiceAtendimento} from '../../atendimento/services/model.service';
import {CoreUtils} from '../../../../../core/utils/CoreUtils';
import {BaseService} from '@services';
import {LocalStorage} from 'ngx-webstorage';

@Injectable()
export class ModelService extends BaseService {
    listModels: Cliente[];
    model: Cliente;

    @LocalStorage('rotas-por-estado')
    private configRotasAtendimentoPorEstado: any;

    constructor(serviceAtendimento: ServiceAtendimento, ) {
        super();

        this.page.size = 10;
        this.page.pageNumber = 0;

        CoreUtils.registerExternalService(
            {
                modelService: this,
                externalServices: [
                    {module: 'atendimento', serviceAtendimento }
                ]
            }
        );

        this.registerDynamicStates();
    }

    registerDynamicStates() {
        const configRotasAtendimentoPorEstado = {
            AI: {
                    action: 'get',
                    serviceName: 'clientes',
                    module: 'cliente',
                    returnUrl: 'clientes/dados-cadastrais',
                    resourceValue: '',
                    resourcePathAPI: 'clientes/{cpfCnpj}',
                    extraParams: {},
                    state: 'view'
                },
            DC: {
                action: 'get',
                serviceName: 'renegociacoes',
                module: 'renegociacao',
                returnUrl: 'contratos/search-contratos',
                resourceValue: '',
                resourcePathAPI: 'contratos/{cpfCnpj}',
                extraParams: {},
                state: 'view'
            },
            CS: {
                action: 'get',
                state:'edit',
                serviceName: 'renegociacoes',
                module: 'renegociacao',
                returnUrl: 'renegociacoes/renegociacao',
                resourceValue: '',
                resourcePathAPI: 'renegociacoes-resumo/{idAtendimento}',
                extraParams: {},
            },
            SI: {
                action: 'get',
                state:'edit',
                serviceName: 'renegociacoes',
                module: 'renegociacao',
                returnUrl: 'renegociacoes/renegociacao',
                resourceValue: '',
                resourcePathAPI: 'renegociacoes-resumo/{idAtendimento}',
                extraParams: {},
            },
            AC: {
                action: 'get',
                serviceName: 'renegociacoes',
                module: 'renegociacao',
                returnUrl: 'renegociacoes/renegociacao',
                resourceValue: '',
                resourcePathAPI: 'renegociacoes-resumo/{idAtendimento}',
                extraParams: {},
                state: 'view'
            }
        };

        this.storage.store('rotas-por-estado', configRotasAtendimentoPorEstado );
    }

    public getDadosCliente = (result) => {
        this.serviceName = 'clientes';

        let currentClient = this.storage.retrieve('currentClient');

        this.getAllFromPath('clientes/'+currentClient.cpfCnpj)
            .subscribe((response: any) => {
                if (!response) {
                    return;
                }

                let cliente = Object.assign(new Cliente({}), response) ;

                cliente.ufAtual = response.enderecos[0]?.uf;
                cliente.bairroAtual = response.enderecos[0]?.bairro;
                cliente.cidadeAtual = response.enderecos[0]?.nomeLocalidade;
                cliente.emailAtual = response.emails[0]?.coComunicacao;
                cliente.telefoneAtual = response.telefones[0]?.coComunicacao;

                this.setCurrentComponentResult( result, cliente);
                console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
            });
    }
}
