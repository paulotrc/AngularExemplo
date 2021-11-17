import { NgModule } from '@angular/core';
import {NavbarVerticalStyleCaixaComponent} from './navbar-style-caixa.component';
import {CoreNavigationModule} from '../../../../../../../core/components/navigation/navigation.module';
import {CoreSharedModule} from '../../../../../../../core/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [
        NavbarVerticalStyleCaixaComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CoreSharedModule,
        CoreNavigationModule
    ],
    exports     : [
        NavbarVerticalStyleCaixaComponent
    ]
})
export class NavbarVerticalStyle2Module {
}
