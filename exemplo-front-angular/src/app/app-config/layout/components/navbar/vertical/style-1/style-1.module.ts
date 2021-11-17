import { NgModule } from '@angular/core';
import {NavbarVerticalStyle1Component} from './style-1.component';
import {CoreSharedModule} from '../../../../../../../core/shared.module';
import {CoreNavigationModule} from '../../../../../../../core/components/navigation/navigation.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CoreSharedModule,
        CoreNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module {
}
