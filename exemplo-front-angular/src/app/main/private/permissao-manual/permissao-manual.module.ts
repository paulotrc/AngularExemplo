import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FormPermissaoManualComponent} from './components/forms/form-permissao-manual/form-permissao-manual.component';
import {ModelService} from './services/model.service';
import {BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule} from '../../../../core/components';
import {CoreSharedModule} from '../../../../core/shared.module';
import {PermissaoManualRoutingModule} from './permissao-manual-routing.module';
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
import {SearchPermissaoManualComponent} from './components/searchs/search-permissao-manual/search-permissao-manual.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    imports: [
        PermissaoManualRoutingModule,
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
        MatTabsModule,
        MatRadioModule,
        MatTableModule,
    ],
  declarations: [
    MainComponent,
    FormPermissaoManualComponent,
    SearchPermissaoManualComponent
    ],
  providers: [ModelService],
  entryComponents: [
    FormPermissaoManualComponent
  ]
})
export class PermissaoManualModule { }
