import {NgModule} from '@angular/core';
import {CoreSharedModule} from 'core/shared.module';
import {CoreConfirmDialogModule, CoreSidebarModule} from 'core/components';

import {MainComponent} from './main/main.component';
import {FormComponent} from './main/form/form.component';
import {SelectedBarComponent} from './main/selected-bar/selected-bar.component';
import {ModelService} from './services/model.service';
import {ExemploRoutingModule} from './exemplo-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRippleModule} from '@angular/material/core';
import {CommonSharedModule} from '../../../common/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
    imports: [
        ExemploRoutingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        CommonSharedModule,
        CoreSharedModule,
        CoreConfirmDialogModule,
        CoreSidebarModule,
        NgxDatatableModule,
        MatSlideToggleModule
    ],
    declarations: [
        MainComponent,
        FormComponent,
        SelectedBarComponent
    ],
    /*exports:  [MainComponent, StructureComponent, DynamicListComponent, SelectedBarComponent],*/
    providers: [ModelService],
    entryComponents: [FormComponent]
})
export class ExemploModule { }
