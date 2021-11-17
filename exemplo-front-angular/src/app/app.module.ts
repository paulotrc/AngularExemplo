import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NgZone} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreSharedModule} from '../core/shared.module';
import {CoreModule} from '../core/core.module';
import {
    CoreGroupAutocompleteModule,
    CoreProgressBarModule,
    CoreSidebarModule,
    CoreThemeOptionsModule
} from '../core/components';
import {LayoutModule} from './app-config/layout/layout.module';
import {TranslateModule} from '@ngx-translate/core';
import {coreConfig} from './app-config';
import {JwtInterceptor} from './common/helpers/jwt.interceptor';
import {ErrorInterceptor} from './common/helpers/error.interceptor';
import {fakeBackendProvider} from './common/helpers/fake-backend';
import {EmptyModule} from './main/empty/empty.module';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from './common/services/fake-db.service';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxMaskModule} from 'ngx-mask';
import {SharedPipeModule} from './common/helpers/pipes/shared-pipe/shared-pipe.module';
import {DropZoneDirective} from './common/directives/drop-zone.directive';
import {FileUploadComponent} from './common/components/file-upload/file-upload.component';
import {FileSizePipe} from './common/helpers/pipes/file-size.pipe';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ItemRendererAccordionComponent} from './common/components/item-renderer-accordion/item-renderer-accordion.component';
import {PrintLayoutComponent} from '../core/components/print-layout/print-layout.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {CommonSharedModule} from './common/shared.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ControlMessagesComponent} from './common/forms/control-messages/control-messages.component';
import {ControlErrorContainerDirective} from './common/directives/control-error-container.directive';
import {MatSortModule} from '@angular/material/sort';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppService} from './app.service';
import {AlertModule} from './common/components/alert/alert/alert.module';
import {CoreAppInjector} from '../core/CoreAppInjector';
import {KeycloakService} from "./common/utils/security/keycloak/keycloak.service";
import {keycloakInitialize} from "./common/utils/security/keycloak/keycloak.initialize";

export function app_init(appService: AppService) {
    return () => appService.initializeApp();
}

@NgModule({
    declarations: [
        AppComponent,
        DropZoneDirective,
        FileUploadComponent,
        FileSizePipe,
        ItemRendererAccordionComponent,
        PrintLayoutComponent,
        ItemRendererAccordionComponent,
        ControlMessagesComponent,
        ControlErrorContainerDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,

        TranslateModule.forRoot(),
        NgxWebstorageModule.forRoot({ prefix: 'siiga', separator: '.', caseSensitive: true }),

        // Material moment date module
        MatMomentDateModule,
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
        MatNativeDateModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatSortModule,

        SharedPipeModule,

        NgxDropzoneModule,

        // Core modules
        CoreSharedModule,
        CoreModule.forRoot(coreConfig),
        CoreProgressBarModule,
        CoreSharedModule,
        CoreSidebarModule,
        CoreThemeOptionsModule,
        CoreGroupAutocompleteModule,

        // Common Module
        CommonSharedModule,

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        NgxMaskModule.forRoot({
            validation: true,
        }),

        // App modules
        LayoutModule,
        EmptyModule,
        AlertModule

    ],
    providers: [
        /*{provide: ErrorHandler, useClass: GlobalErrorHandler},*/
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
/*        AppService,
        {
            provide: APP_INITIALIZER,
            useFactory: app_init,
            deps: [AppService],
            multi: true
        },*/
        KeycloakService,
        {
            provide: APP_INITIALIZER,
            useFactory: keycloakInitialize,
            deps: [KeycloakService],
            multi: true
        },
        // provider used to create fake backend
        fakeBackendProvider,
    ],
    bootstrap: [AppComponent],
    exports: [
        NgxMaskModule,
        NgxDropzoneModule,
        BrowserAnimationsModule,
        ControlMessagesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA/*,
    NO_ERRORS_SCHEMA*/
    ]
})
export class AppModule {
    constructor(private ngZone: NgZone, injector: Injector ) {
        (window as any).ngZone = this.ngZone;
        CoreAppInjector.setInjector(injector);
    }
}
