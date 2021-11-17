import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
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
import { DetailResumosRenegociacaoComponent } from './components/details/detail-resumos-renegociacao/detail-resumos-renegociacao.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormRenegociacaoComponent } from './components/forms/form-renegociacao/form-renegociacao.component';
import {DetailResumosRenegociacaoPdfComponent} from './components/details/detail-resumos-renegociacao-pdf/detail-resumos-renegociacao-pdf.component';
import {ModelService} from './services/model.service';
import {RenegociacaoRoutingModule} from './renegociacao-routing.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ModelService as ServiceCliente } from '../cliente/services/model.service';
import { DetailBoletoPdfComponent } from './components/details/detail-boleto-pdf/detail-boleto-pdf.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
    imports: [
        RenegociacaoRoutingModule,
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
        MatSidenavModule,
        MatDatepickerModule,
        MatDialogModule
    ],
    declarations: [
        MainComponent,
        DetailResumosRenegociacaoComponent,
        DetailResumosRenegociacaoPdfComponent,
        DetailBoletoPdfComponent,
        FormRenegociacaoComponent
    ],
    providers: [ModelService, ServiceCliente],
    entryComponents: [
        FormRenegociacaoComponent,
        MatDialogModule
    ]
})
export class RenegociacaoModule { }
