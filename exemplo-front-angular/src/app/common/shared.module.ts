import {ModuleWithProviders, NgModule} from '@angular/core';
import {HeaderBreadcrumbV1Component} from './components/exemplo/header/header-v1/header-breadcrumb-v1/header-breadcrumb-v1.component';
import {HeaderV1Component} from './components/exemplo/header/header-v1/header-v1.component';
import {CommonModule} from '@angular/common';
import { ControlErrorComponent } from './forms/control-error/control-error.component';
import {AuthenticationService} from '@services';
import {ControlErrorsDirective} from './directives/control-errors.directive';
import {DynamicListComponent} from './components/dynamic-list/dynamic-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DynamicDatagridActionsComponent } from './components/dynamic-datagrid-actions/dynamic-datagrid-actions.component';
import {BoletoComponent} from './components/boleto/boleto.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { SanitizeHtmlPipe } from './pipers/sanitize-html.pipe';
import { AlertComponent } from './components/alert/alert.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SubFormInputListComponent} from './components/exemplo/forms/sub-form-input-list/sub-form-input-list.component';
import {MatInputModule} from '@angular/material/input';
import {NgxMaskModule} from 'ngx-mask';
import { SubFormEnderecosComponent } from './components/exemplo/forms/sub-form-enderecos/sub-form-enderecos.component';
import { DebuggerComponent } from './components/debugger/debugger.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {SubFormContratosRenegociacaoComponent} from './components/exemplo/forms/sub-form-contratos-renegociacao/sub-form-contratos-renegociacao.component';
import {RealCurrencyPipe} from './pipers/real-currency.pipe';
import {NgxCurrencyModule} from "ngx-currency";
import {CpfCnpjPipe} from "./pipers/cpf-cnpj.pipe";
import {TranslateModule} from "@ngx-translate/core";

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true
};

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxMaskModule,
        MatDividerModule,
        MatExpansionModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        TranslateModule
    ],
    declarations: [
        HeaderV1Component,
        HeaderBreadcrumbV1Component,
        ControlErrorComponent,
        ControlErrorsDirective,
        DynamicListComponent,
        DynamicDatagridActionsComponent,
        BoletoComponent,
        BarcodeComponent,
        SanitizeHtmlPipe,
        AlertComponent,
        SubFormInputListComponent,
        SubFormEnderecosComponent,
        SubFormContratosRenegociacaoComponent,
        DebuggerComponent,
        RealCurrencyPipe,
        CpfCnpjPipe,
    ],
    exports: [
        HeaderV1Component,
        DynamicListComponent,
        BoletoComponent,
        SanitizeHtmlPipe,
        AlertComponent,
        SubFormInputListComponent,
        SubFormEnderecosComponent,
        SubFormContratosRenegociacaoComponent,
        DebuggerComponent,
        RealCurrencyPipe,
        NgxCurrencyModule,
        CpfCnpjPipe
    ]
})
export class CommonSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonSharedModule,
            providers: [AuthenticationService]
        };
    }
}
