import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Teste2Component } from './teste2.component';

const routes = [
    {
        path     : '',
        component: Teste2Component
    }
];

@NgModule({
    declarations: [
        Teste2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule
    ],
    exports     : [
        Teste2Component
    ]
})

export class Teste2Module
{
}
