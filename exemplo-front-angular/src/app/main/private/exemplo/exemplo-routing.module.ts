import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelService } from './services/model.service';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {
        path     : '',
        component: MainComponent,
        resolve  : {
            itens: ModelService
        },
        data: {
            action: 'get', // Ação padrão  do Formulário
            module: 'exemplo',  // Módulo do Componente atual

            serviceName: 'exemplos', // Nome do serviço no backend/API
            resourcePathAPI: 'exemplos', // Path do recurso a ser requisitado na API um {formControlName} pode ser usado como valor
            // formExtraParams: ['cpfCnpj'], // Campos do form atual, que podem ser usados como  parâmetros extras  na próxima tela ou como valor do resourcePathAPI

            pageSize: '10', // Quantidades de registros por página  padrão
            pageNumber: '0', // Valor inicial para paginação

            // returnUrl: 'exemplos',  // Path da próxima tela a ser carregada.
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
export class ExemploRoutingModule {}
