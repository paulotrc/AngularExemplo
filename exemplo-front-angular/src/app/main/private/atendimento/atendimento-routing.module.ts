import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelService } from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-atendimentos',
        pathMatch: 'full'
    },
    {
        path: 'search-atendimentos',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'atendimento',  // Módulo do Componente atual

            serviceName: 'meus-atendimentos', // Nome do serviço no backend/API
            extraParams: [{teste: 'apenas um teste'}], // Variáveis do .ts atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI
            formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            resourcePathAPI: 'meus-atendimentos', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            // ## returnUrl: 'atendimentos/detail-clientes',  // Path da próxima tela a ser carregada.
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
export class AtendimentoRoutingModule {}
