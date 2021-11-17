import { NgModule } from '@angular/core';

import { CoreWidgetComponent } from './widget.component';
import { CoreWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        CoreWidgetComponent,
        CoreWidgetToggleDirective
    ],
    exports     : [
        CoreWidgetComponent,
        CoreWidgetToggleDirective
    ],
})
export class CoreWidgetModule
{
}
