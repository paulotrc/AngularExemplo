import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ModelService } from './services/model.service';
import { BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule } from '../../../../core/components';
import { CoreSharedModule } from '../../../../core/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonSharedModule } from '../../../common/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { ContratoRoutingModule } from 'app/main/private/contrato/contrato-routing.module';
import { FormContratosComponent } from './components/forms/form-contratos/form-contratos.component';
import { SearchContratosComponent } from './components/searchs/search-contratos/search-contratos.component';
import { DetailContratosComponent } from './components/details/detail-contratos/detail-contratos.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
    imports: [
        ContratoRoutingModule,
        CommonModule,
        CommonSharedModule,
        CoreSharedModule,
        CoreConfirmDialogModule,
        CoreSidebarModule,
        BreadcrumbModule,
        MatProgressBarModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatMenuModule,
        MatExpansionModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule
    ],
    declarations: [
        MainComponent,
        FormContratosComponent,
        SearchContratosComponent,
        DetailContratosComponent,
    ],
    providers: [ModelService],
    entryComponents: [
        FormContratosComponent
    ]
})
export class ContratoModule { }
