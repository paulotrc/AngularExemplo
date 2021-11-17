import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FormSamplesComponent} from './components/forms/form-samples/form-samples.component';
import {ModelService} from './services/model.service';
import {BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule} from '../../../../core/components';
import {CoreSharedModule} from '../../../../core/shared.module';
import {SampleRoutingModule} from './sample-routing.module';
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
import {SearchSamplesComponent} from './components/searchs/search-samples/search-samples.component';
import {DetailBoletosComponent} from './components/details/detail-boletos/detail-boletos.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ReportSampleComponent} from './components/reports/report-sample/report-sample.component';

@NgModule({
    imports: [
        SampleRoutingModule,
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
        MatTabsModule
    ],
  declarations: [
    MainComponent,
    FormSamplesComponent,
    SearchSamplesComponent,
    DetailBoletosComponent,
    ReportSampleComponent
    ],
  providers: [ModelService],
  entryComponents: [
    FormSamplesComponent
  ]
})
export class SampleModule { }
