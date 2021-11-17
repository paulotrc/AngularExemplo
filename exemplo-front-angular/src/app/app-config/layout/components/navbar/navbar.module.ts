import { NgModule } from '@angular/core';

import { CoreSharedModule } from '../../../../../core/shared.module';



import {NavbarComponent} from './navbar.component';
import {NavbarVerticalStyle1Module} from './vertical/style-1/style-1.module';
import {NavbarVerticalStyle2Module} from './vertical/style-2/navbar-style-caixa.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        CoreSharedModule,

        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
