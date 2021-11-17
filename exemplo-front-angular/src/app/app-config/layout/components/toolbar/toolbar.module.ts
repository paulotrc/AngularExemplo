import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CoreToolbarComponent} from './core-toolbar.component';
import {CoreSharedModule} from '../../../../../core/shared.module';
import {CoreSearchBarModule} from '../../../../../core/components';
import {CoreShortcutsModule} from '../../../../../core/components/shortcuts/shortcuts.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [
        CoreToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        CoreSharedModule,
        CoreSearchBarModule,
        CoreShortcutsModule
    ],
    exports     : [
        CoreToolbarComponent
    ]
})
export class ToolbarModule {
}
