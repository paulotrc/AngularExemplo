import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelService} from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-contratos',
        pathMatch: 'full'
    },
    {
        path: 'search-contratos',
        component: MainComponent,
        resolve  : {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'contrato',  // Módulo do Componente atual

            serviceName: 'contratos', // Nome do serviço no backend/API
            formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI
            resourcePathAPI: 'contratos/{extraParamsFromParent.cpfCnpj|storage}', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: 'contratos/renegociacao',  // Path da próxima tela a ser carregada.
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
export class ContratoRoutingModule {}
