import { NgModule } from '@angular/core';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { ClienteRoutingModule } from 'app/main/private/cliente/cliente-routing.module';
import { FormDadosCadastraisComponent }
from 'app/main/private/cliente/components/forms/form-dados-cadastrais/form-dados-cadastrais.component';
import { SearchClientesComponent } from 'app/main/private/cliente/components/searchs/search-clientes/search-clientes.component';
import { DetailClientesComponent } from 'app/main/private/cliente/components/details/detail-clientes/detail-clientes.component';
import { ModelService as ServiceAtendimento } from '../atendimento/services/model.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SubFormInputListComponent } from 'app/common/components/caixa/forms/sub-form-input-list/sub-form-input-list.component';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
    imports: [
        ClienteRoutingModule,
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
        MatTabsModule,
        NgxMaskModule,
    ],
    declarations: [
        MainComponent,
        FormDadosCadastraisComponent,
        SearchClientesComponent,
        DetailClientesComponent
    ],
    providers: [ModelService, ServiceAtendimento],
    entryComponents: [
        FormDadosCadastraisComponent
    ]
})
export class ClienteModule { }
