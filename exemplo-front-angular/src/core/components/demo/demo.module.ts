import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { CoreDemoContentComponent } from './demo-content/demo-content.component';
import { CoreDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    declarations: [
        CoreDemoContentComponent,
        CoreDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        CoreDemoContentComponent,
        CoreDemoSidebarComponent
    ]
})
export class CoreDemoModule {
}
