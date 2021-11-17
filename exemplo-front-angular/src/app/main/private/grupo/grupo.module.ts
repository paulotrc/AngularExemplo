import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FormGruposComponent} from './components/forms/form-grupos/form-grupos.component';
import {ModelService} from './services/model.service';
import {BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule} from '../../../../core/components';
import {CoreSharedModule} from '../../../../core/shared.module';
import {GrupoRoutingModule} from './grupo-routing.module';
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
import {SearchGruposComponent} from './components/searchs/search-grupos/search-grupos.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        GrupoRoutingModule,
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
        MatSelectModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatMenuModule,
        MatTabsModule,
        MatDialogModule
    ],
  declarations: [
    MainComponent,
    FormGruposComponent,
    SearchGruposComponent
    ],
  providers: [ModelService],
  entryComponents: [
      FormGruposComponent,
      MatDialogModule
  ]
})
export class GrupoModule { }
