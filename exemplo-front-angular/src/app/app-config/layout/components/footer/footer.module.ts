import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CoreSharedModule} from '../../../../../core/shared.module';
import {FooterComponent} from './footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        CoreSharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule {
}
