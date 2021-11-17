import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ModelService} from "../atendimento/services/model.service";

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-campanha',
        pathMatch: 'full'
    },
    {
        path: 'search-campanha',
        component: MainComponent,
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'campanha',  // Módulo do Componente atual

            serviceName: 'campanhas', // Nome do serviço no backend/API
            extraParams: [{param: ''}], // Variáveis do .ts atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI
            formExtraParams: [''], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            resourcePathAPI: 'campanhas/{id}', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            // returnUrl: 'campanha/search-campanha',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'form-campanha',
        component: MainComponent,
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'campanha',  // Módulo do Componente atual

            serviceName: 'campanhas', // Nome do serviço no backend/API
            resourcePathAPI: '', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            formExtraParams: [''], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: 'campanha/search-campanha',  // Path da próxima tela a ser carregada.
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
export class CampanhaRoutingModule {}
