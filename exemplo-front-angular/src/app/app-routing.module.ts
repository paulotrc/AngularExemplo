import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from "./common/guard/logged-in-guard.service";

// teste
const routes: Routes = [
    {
        path: 'login',
        /*loadChildren: './main/atendimento/atendimento.module#RenegociacaoModule'// use this syntax for non-ivy or Angular 7 and below*/
        loadChildren: () => import('./main/public/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'teste',
        /*loadChildren: './main/atendimento/atendimento.module#RenegociacaoModule'// use this syntax for non-ivy or Angular 7 and below*/
        loadChildren: () => import('./main/teste/teste.module').then(m => m.TesteModule),
    },
    {
        path: 'home',
        redirectTo: 'clientes',
    },
    {
        path: 'grupos',
        loadChildren: () => import( './main/private/grupo/grupo.module' )
            .then(m => m.GrupoModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'situacao-especial',
        loadChildren: () => import( './main/private/situacao-especial/situacao-especial.module' )
            .then(m => m.SituacaoEspecialModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'permissao-manual',
        loadChildren: () => import( './main/private/permissao-manual/permissao-manual.module' )
            .then(m => m.PermissaoManualModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'atendimentos',
        loadChildren: () => import( './main/private/atendimento/atendimento.module' )
            .then(m => m.AtendimentoModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'clientes',
        loadChildren: () => import( './main/private/cliente/cliente.module' )
            .then(m => m.ClienteModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'contratos',
        loadChildren: () => import( './main/private/contrato/contrato.module' )
            .then(m => m.ContratoModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'renegociacoes',
        loadChildren: () => import( './main/private/renegociacao/renegociacao.module' )
            .then(m => m.RenegociacaoModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'atendimentos',
        loadChildren: () => import( './main/private/atendimento/atendimento.module' )
            .then(m => m.AtendimentoModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'exemplo',
        loadChildren: () => import('./main/private/exemplo/exemplo.module')
            .then(m => m.ExemploModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'samples',
        loadChildren: () => import('./main/private/sample/sample.module')
            .then(m => m.SampleModule),
        canActivate: [LoggedInGuard]
    },
    {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
    },
    {
        path: 'logout',
        redirectTo: 'login',
        pathMatch: 'full'
    }/*,
    {path: '**', redirectTo: 'login'}*/
  ];

/*{ pPath: '**', component: EmptyRouteComponent },*/

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
