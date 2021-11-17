import { NgModule } from '@angular/core';

import { CoreCountdownComponent } from './countdown.component';

@NgModule({
    declarations: [
        CoreCountdownComponent
    ],
    exports: [
        CoreCountdownComponent
    ],
})
export class CoreCountdownModule
{
}
