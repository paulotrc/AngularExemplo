import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { CoreNavigationComponent } from './navigation.component';
import { CoreNavVerticalItemComponent } from './vertical/item/item.component';
import { CoreNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { CoreNavVerticalGroupComponent } from './vertical/group/group.component';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        CoreNavigationComponent
    ],
    declarations: [
        CoreNavigationComponent,
        CoreNavVerticalGroupComponent,
        CoreNavVerticalItemComponent,
        CoreNavVerticalCollapsableComponent
    ]
})
export class CoreNavigationModule {
}
