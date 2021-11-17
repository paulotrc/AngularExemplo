import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ChangelogComponent } from './changelog.component';
import {CoreSharedModule} from '../../../core/shared.module';

const routes = [
    {
        path     : '',
        component: ChangelogComponent
    }
];

@NgModule({
    declarations: [
        ChangelogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        CoreSharedModule
    ],
    exports     : [
        ChangelogComponent
    ]
})

export class ChangelogModule
{
}
