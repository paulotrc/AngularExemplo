import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FormAtendimentosComponent} from './components/forms/form-atendimentos/form-atendimentos.component';
import {SearchAtendimentosComponent} from './components/searchs/search-atendimentos/search-atendimentos.component';
import {ModelService} from './services/model.service';
import {BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule} from '../../../../core/components';
import {CoreSharedModule} from '../../../../core/shared.module';
import {AtendimentoRoutingModule} from './atendimento-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonSharedModule} from '../../../common/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        AtendimentoRoutingModule,
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
    ],
  declarations: [
    MainComponent,
    FormAtendimentosComponent,
    SearchAtendimentosComponent
    ],
  providers: [ModelService],
  entryComponents: [
    FormAtendimentosComponent
  ]
})
export class AtendimentoModule { }
