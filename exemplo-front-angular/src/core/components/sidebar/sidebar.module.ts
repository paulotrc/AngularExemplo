import { NgModule } from '@angular/core';

import { CoreSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        CoreSidebarComponent
    ],
    exports     : [
        CoreSidebarComponent
    ]
})
export class CoreSidebarModule
{
}
