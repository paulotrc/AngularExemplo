import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelService} from './services/model.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        redirectTo: 'renegociacao',
        pathMatch: 'full'
    },
    {
        path: 'renegociacao',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get',
            state:'edit',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            formExtraParams: ['idAtendimento', 'cpfCnpj', 'nome'],
            resourcePathAPI: 'renegociacoes-resumo/{idAtendimento|storage}',
            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação
            returnUrl: 'renegociacoes/renegociacao',
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }

    },
    {
        path: 'detail-resumos-renegociacao-pdf',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            //formExtraParams: ['idAtendimento', 'cpfCnpj', 'nome'],
            //resourcePathAPI: 'renegociacoes/{idAtendimento}',
            returnUrl: 'renegociacoes/detail-resumos-renegociacao-pdf',
            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'detail-boleto-pdf',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            //formExtraParams: ['idAtendimento', 'cpfCnpj', 'nome'],
            resourcePathAPI: 'boletos/{idAtendimento|storage}',
            returnUrl: '',
            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação
            languages: ['en', 'pt-br'],
            defaultLanguage: ['pt-br']
        }
    },
    {
        path: 'detail-resumos-renegociacao',
        component: MainComponent,
        resolve: {
            itens: ModelService
        },
        data: {
            action: 'get',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            formExtraParams: ['idAtendimento', 'cpfCnpj', 'nome'],
            resourcePathAPI: 'renegociacoes-resumo/{idAtendimento|storage}',
            /*returnUrl: '',*/
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
export class RenegociacaoRoutingModule {}
