import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelService } from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'search-grupos',
        pathMatch: 'full'
    },
    {
        path: 'search-grupos',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'grupo',  // Módulo do Componente atual

            serviceName: 'grupos', // Nome do serviço no backend/API
            resourcePathAPI: 'grupos', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            formExtraParams: ['id'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            returnUrl: 'grupos/grupo',  // Path da próxima tela a ser carregada.
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'form-grupos',
        component: MainComponent,
        data: {
            action: 'create',
            module: 'grupo',
            serviceName: 'grupos',
            //formExtraParams: ['cpfCnpj'],
            resourcePathAPI: 'grupos',
            returnUrl: 'situacao-especial/form-situacao-especial', //   Url  padrão da próxima tela
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
export class GrupoRoutingModule {}
