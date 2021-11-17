import { NgModule } from '@angular/core';
import {CoreIfOnDomDirective} from './core-if-on-dom/core-if-on-dom.directive';
import {CoreInnerScrollDirective} from './core-inner-scroll/core-inner-scroll.directive';
import {CoreMatSidenavHelperDirective, CoreMatSidenavTogglerDirective} from './core-mat-sidenav/core-mat-sidenav.directive';
import {CorePerfectScrollbarDirective} from './core-perfect-scrollbar/core-perfect-scrollbar.directive';


@NgModule({
    declarations: [
        CoreIfOnDomDirective,
        CoreInnerScrollDirective,
        CoreMatSidenavHelperDirective,
        CoreMatSidenavTogglerDirective,
        CorePerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        CoreIfOnDomDirective,
        CoreInnerScrollDirective,
        CoreMatSidenavHelperDirective,
        CoreMatSidenavTogglerDirective,
        CorePerfectScrollbarDirective
    ]
})
export class CoreDirectivesModule
{
}
