import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';

import {CoreSharedModule} from '../../../../../core/shared.module';
import {CoreSidebarModule} from '../../../../../core/components';
import {VlLayoutComponent} from './v-layout.component';
import {ContentModule} from '../../components/content/content.module';
import {FooterModule} from '../../components/footer/footer.module';
import {QuickPanelModule} from '../../components/quick-panel/quick-panel.module';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {ToolbarModule} from '../../components/toolbar/toolbar.module';
import {CommonSharedModule} from "../../../../common/shared.module";

@NgModule({
    declarations: [
        VlLayoutComponent
    ],
    imports: [
        RouterModule,

        CoreSharedModule,
        CoreSidebarModule,

        ContentModule,
        FooterModule,
        QuickPanelModule,
        NavbarModule,
        ToolbarModule,
        CommonSharedModule
    ],
    exports     : [
        VlLayoutComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA/*,
      NO_ERRORS_SCHEMA*/
    ]
})
export class VerticalLayout3Module
{
}
