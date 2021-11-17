import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CoreMaterialColorPickerComponent} from './material-color-picker.component';
import {CorePipesModule} from '../../pipes/pipes.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
    declarations: [
        CoreMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatRippleModule,

        CorePipesModule
    ],
    exports: [
        CoreMaterialColorPickerComponent
    ],
})
export class CoreMaterialColorPickerModule {
}
