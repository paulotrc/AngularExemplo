import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelService} from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
            {
                path: '',
                redirectTo: 'search-clientes',
                pathMatch: 'full'
            },
            {
                path: 'search-clientes',
                component: MainComponent,
               /* resolve  : {
                    itens: ModelService
                },*/
                data: {
                    action: 'get', // Ação padrão  do Formulário
                    module: 'cliente',  // Módulo do Componente atual

                    serviceName: 'clientes', // Nome do serviço no backend/API
                    resourcePathAPI: 'clientes-inicio-atendimento/{cpfCnpj}', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
                    formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

                    pageSize: '10', // Quantidades de registros por página  padrão
                    pageNumber: '0', // Valor inicial para paginação

                    returnUrl: 'clientes/dados-cadastrais',  // Path da próxima tela a ser carregada.
                    languages: ['en', 'pt-br'],
                    defaultLanguage: ['pt-br'],
                }
            },
            {
                path: 'detail-clientes',
                component: MainComponent,
                    resolve: {
                        itens: ModelService
                    },
                data: {
                    action: 'get',
                    module: 'cliente',
                    serviceName: 'clientes',
                    formExtraParams: ['cpfCnpj'],
                    resourcePathAPI: 'clientes/{cpfCnpj}',

                    pageSize: '10', // Quantidades de registros por página  padrão
                    pageNumber: '0', // Valor inicial para paginação
                    /*returnUrl: '',*/
                    languages: ['en', 'pt-br'],
                    defaultLanguage: ['pt-br']
                }

            },
            {
                path     : 'dados-cadastrais',
                component: MainComponent,
                // resolve  : {
                //     itens: ModelService
                // },
                data: {
                    action: 'get',
                    module: 'cliente',
                    serviceName: 'clientes',
                    extraParams: [{teste: 'apenas um teste'}],
                    formExtraParams: ['cpfCnpj','nome'],
                    resourcePathAPI: 'clientes',
                    returnUrl: 'contratos/search-contratos', //   Url  padrão da próxima tela
                    pageSize: '10', // Quantidades de registros por página  padrão
                    pageNumber: '0', // Valor inicial para paginação
                    languages: ['en', 'pt-br'],
                    defaultLanguage: ['pt-br']
                }
            }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ClienteRoutingModule {}
