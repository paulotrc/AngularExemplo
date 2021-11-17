import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelService } from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-samples',
        pathMatch: 'full'
    },
    {
        path: 'detail-boletos',
        component: MainComponent,
        resolve: {
            itens: ModelService
        }
    },
    {
        path: 'search-samples',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'sample',  // Módulo do Componente atual

            serviceName: 'samples', // Nome do serviço no backend/API
            resourcePathAPI: 'samples', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: 'samples/sample',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'report-sample',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'sample',  // Módulo do Componente atual

            serviceName: 'samples', // Nome do serviço no backend/API
            resourcePathAPI: 'samples/88', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: '',  // Path da próxima tela a ser carregada.
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
export class SampleRoutingModule {}
