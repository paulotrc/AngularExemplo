import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CoreSharedModule} from '../../../../../core/shared.module';
import {ContentComponent} from './content.component';
import {CommonSharedModule} from "../../../../common/shared.module";


@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule,
        CoreSharedModule,
        CommonSharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
