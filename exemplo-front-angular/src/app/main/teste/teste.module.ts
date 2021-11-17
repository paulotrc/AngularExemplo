import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TesteComponent } from './teste.component';
import {CoreSharedModule} from '../../../core/shared.module';
import {CoreGroupAutocompleteModule} from '../../../core/components';
import {MatSidenavModule} from '@angular/material/sidenav';

const routes = [
    {
        path     : '',
        component: TesteComponent
    }
];

@NgModule({
    declarations: [
        TesteComponent
    ],
    imports: [
        CoreSharedModule,
        RouterModule.forChild(routes),
        TranslateModule,
        MatSidenavModule,
        CoreGroupAutocompleteModule
    ],
    exports     : [
        TesteComponent
    ]
})

export class TesteModule {

}
