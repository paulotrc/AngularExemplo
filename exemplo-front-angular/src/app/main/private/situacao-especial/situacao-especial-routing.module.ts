import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ModelService} from "../atendimento/services/model.service";

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-situacao-especial',
        pathMatch: 'full'
    },
    {
        path: 'search-situacao-especial',
        component: MainComponent,
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'situacao-especial',  // Módulo do Componente atual

            serviceName: 'situacoes-especiais', // Nome do serviço no backend/API
            extraParams: [{teste: 'apenas um teste'}], // Variáveis do .ts atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI
            formExtraParams: ['grupoSelecionado'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            resourcePathAPI: 'situacoes-especiais/{id}', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            // returnUrl: 'situacao-especial/search-situacao-especial',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'form-situacao-especial-inclusao-manual',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'situacao-especial',  // Módulo do Componente atual
            serviceName: 'situacoes-especiais', // Nome do serviço no backend/API
            formExtraParams: ['id'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI
            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação
            resourcePathAPI: 'situacoes-especiais/{id}', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            // returnUrl: 'situacao-especial/search-situacao-especial',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'form-situacao-especial',
        component: MainComponent,
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'situacao-especial',  // Módulo do Componente atual

            serviceName: 'situacoes-especiais', // Nome do serviço no backend/API
            resourcePathAPI: '', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            formExtraParams: [''], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: 'situacao-especial/search-situacao-especial',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br'],
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class SituacaoEspecialRoutingModule {}
