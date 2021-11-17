import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FormSituacaoEspecialComponent} from './components/forms/form-situacao-especial/form-situacao-especial.component';
import {ModelService} from './services/model.service';
import {BreadcrumbModule, CoreConfirmDialogModule, CoreSidebarModule} from '../../../../core/components';
import {CoreSharedModule} from '../../../../core/shared.module';
import {SituacaoEspecialRoutingModule} from './situacao-especial-routing.module';
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
import {SearchSituacaoEspecialComponent} from './components/searchs/search-situacao-especial/search-situacao-especial.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {ModelService as ServiceGrupo} from "../grupo/services/model.service";
import { DetailSituacaoEspecialComponent } from './components/details/detail-situacao-especial/detail-situacao-especial.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DeleteSituacaoEspecialComponent } from './components/deletes/delete-situacao-especial/delete-situacao-especial.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormSituacaoEspecialInclusaoManualComponent } from './components/forms/form-situacao-especial-inclusao-manual/form-situacao-especial-inclusao-manual.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';


@NgModule({
    imports: [
        SituacaoEspecialRoutingModule,
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
        MatSelectModule,
        MatExpansionModule,
        MatDialogModule
    ],
  declarations: [
    MainComponent,
    FormSituacaoEspecialComponent,
    SearchSituacaoEspecialComponent,
    DetailSituacaoEspecialComponent,
    DeleteSituacaoEspecialComponent,
    FormSituacaoEspecialInclusaoManualComponent
    ],
    providers: [ModelService, ServiceGrupo,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  entryComponents: [
      FormSituacaoEspecialComponent,
      MatDialogModule
  ]
})
export class SituacaoEspecialModule { }
