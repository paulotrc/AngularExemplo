import {AfterViewInit, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {FormBuilder, FormControl} from '@angular/forms';
import {AlertService, AuthenticationService} from '../services';
import {User} from '../models';
import {SuperForm} from './super-form';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CoreConfigService} from '../../../core/services/config.service';
import {CoreTranslationLoaderService} from '../../../core/services/translation-loader.service';
import {CoreAppInjector} from '../../../core/CoreAppInjector';
import {CoreUtils} from '../../../core/utils/CoreUtils';
import {Page} from '../components/pagging/Page';
import {ModelsDataSource} from '../services/ModelsDataSource';
import {timeout} from '../../../core/decorators/timeout,ts';


export class FormBase extends SuperForm implements  OnInit, OnDestroy, AfterViewInit {

    @Input() onPathChanged: Subject<any>;
    @Input() onServiceNameChanged: Subject<any>;
    @Input() executeExternalService: Subject<any>;
    @Input() onModelDataOperation: Subject<any>;
    @Input() onModelDataChanged: Subject<any>;
    @Input() onModelChanged: Subject<any>;
    @Input() onRedirectOperation: Subject<any>;
    @Input() onRedirectToPath: Subject<any>;
    @Input() onMainContentLoaded: Subject<any>;
    @Input() onSelectedModelsChanged: Subject<any>;
    @Input() closeModalOnRequestOperation: BehaviorSubject<any>;
    @Input() onSearchInputChanged: BehaviorSubject<any>;
    @Input() onCloseModal: Subject<any> = new Subject<any>();
    @Input() module: string;
    @Input() returnUrl: string;
    @Output() onRedirect: EventEmitter<any> = new EventEmitter();
    storage: LocalStorageService;

    model: any = {};
    selectedModels: any[] = [];
    currentUser: User;
    currentUserSubscription: Subscription;
    step: number;
    searchInput: any;
    subscriptions: Subscription[] = [];
    dialogTitle: string;
    isDisabled = false;
    dialogRef: MatDialogRef<any>;
    loading = false;
    nextPage: string; // Prósima página a ser carregada dinamicamente após o retorno com sucesso do backend.
    navigationEnd;
    routePathParam;
    subRoutePathParam;
    public extraParamsFromParent; // Usado para receber valores da tela anterior
    protected parentComponent;
    private pPath: string; // Path equivalente à rota do componente
    private pServiceName: string;
    private dataToSend: any;
    // Private
    private pExtraParams; // Usado para passar valores de uma tela pra outra
    private findParam: any; // Usado para buscas por um valor específico, geralmente um índice ou ID

    public authenticationService: AuthenticationService;
    public router: Router;
    public coreTranslationLoaderService: CoreTranslationLoaderService;
    public listModels: any[];
    protected alertService: AlertService;
    protected route: ActivatedRoute;
    private matDialog: MatDialog;

    protected coreConfigService: CoreConfigService;
    dadosDialogo: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {
        super();

        const injector = CoreAppInjector.getInjector();
        this.storage = injector.get(LocalStorageService);
        this.authenticationService = injector.get(AuthenticationService);
        this.router = injector.get(Router);
        this.coreTranslationLoaderService = injector.get(CoreTranslationLoaderService);
        this.alertService = injector.get(AlertService);
        this.route = injector.get(ActivatedRoute);
        this.matDialog = injector.get(MatDialog);
        this.coreConfigService = injector.get(CoreConfigService);
        this.dialogTitle = dialogData?.dialogTitle;
        this.model = dialogData?.model || this.model;
        this.action = dialogData?.action;
        this.state = dialogData?.state;
        this.onModelDataOperation = dialogData?.onModelDataOperation;
        this.onCloseModal = dialogData?.onCloseModal;
        this.onPathChanged = dialogData?.onPathChanged;
/*
        console.info('ROUTER:: ',  this.router );
        console.info('ROUTER getCurrentNavigation:: ',  this.router.getCurrentNavigation() );
        console.info('ROUTE this.route.routeConfig.:: ',  this.route.routeConfig.data );
        console.info('HUMMM ROUTE:: ',  this.route);
        console.info('HUMMM history.state:: ',  history.state );
*/

        if (!this.authenticationService.currentUserValue) {
            console.info('[FORM-BASE] USUÁRIO NÃO AUTENTICADO' );
            this.router.navigate(['/']);
        }

        this.formBuilder = new FormBuilder();

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        this.pExtraParams = [];

        this.searchInput = new FormControl('');
        this.step = 0;



        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation()) {
                // this.data = this.router.getCurrentNavigation().extras.state.user;
                console.info('ROUTE DATA EXTRAS:: ',  this.router?.getCurrentNavigation()?.extras);
            }
        });

        // component.modelService.serviceName + '-' + returnUrl + '-stateData'
       /* this.storage.observe(this.serviceName + '-' + )
            .subscribe((newValue) => {
                console.log(newValue);
            })*/

/*        this.onModelDataChanged
            .subscribe(serviceName => {
                console.info(' 7.x - [DynamicComponent FORM-BASE] - onModelDataChanged Changed:: ', serviceName);

            })*/
    }

    get extraParams(): any {
        return this.pExtraParams;
    }

    set extraParams(value: any) {
        this.pExtraParams = value;
    }

    get serviceName(): string {
        return this.pServiceName;
    }

    set serviceName(value: string) {
        this.pServiceName = value;
        // this.onServiceNameChanged.next(this.pServiceName);
    }

    get resourcePathAPI(): string {
        return this.pPath;
    }

    get page(): string {
        return  this.modelService.page;
    }

    set resourcePathAPI(value: string) {
        this.pPath = value;
    }

    create<T>(type: (new () => T)): T {
        return new type();
    }

    public sendDataOperation(
        action= null,
        serviceName = null,
        module =  null,
        returnUrl = null,
        resourceValue = null,
        resourcePathAPI = null,
        extraParams = null,
        state = null

    ): void {
        this.action  = action;
        this.loading = true;
        this.prepareDataAndSend( serviceName, module, returnUrl, resourceValue, extraParams, resourcePathAPI, state );
    }

    public sendDynamicDataOperation(objConfig): void {
        this.action  = objConfig.action;
        this.loading = true;
        this.prepareDataAndSend( objConfig.serviceName , objConfig.module, objConfig.returnUrl , objConfig.resourceValue,
            objConfig.extraParams, objConfig.resourcePathAPI, objConfig.state, objConfig.dataToSend );
    }

    public updateDataProvider(operation = null, resourcePathAPI = null): void {

        this.modelService.resourcePathAPI = CoreUtils.prepareResourceValue( resourcePathAPI ||
            this.resourcePathAPI, this.modelService.resourceValue, this.formGroup, this.model, this.storage );
        this.modelService.onReloadDataprovider.next();
        this.modelService.getModel(operation);
    }

    public onSelectedChangeModels(pSelectedModels: any = null, mergeIntoModels = true): void {
        if (mergeIntoModels) {
            this.modelService.listModels = pSelectedModels.slice();
        } else {
            this.selectedModels =  pSelectedModels.slice();
        }
        // this.modelService.onSelectedChangeModels(page);
    }

    ngOnInit() {

        console.info('[INIT_FORMBASE]:: Configurando os dataProperties...', this.route.snapshot);

        if (this.route.routeConfig !== null) { // Primeira tela carregada após o login não tem ainda o routeConfig
            this.configureDefaultProperties(this.route.routeConfig?.data);
            const stateData = this.storage.retrieve(this.route.routeConfig.data.module + '-'
                + this.route.routeConfig.data.serviceName + '/' + this.route.routeConfig.path + '-stateData');

            this.state = this.state || stateData.state;
            console.info('[INIT_FORMBASE]:: STATE...', this.state)

        }

    }

    get dataSource(): any {
        return new ModelsDataSource( this.modelService )
            .onDataChanged(this.modelService.onModelListChanged);
    }

    @timeout(1000)
    ngAfterViewInit() {
        console.log('ngAfterViewInit:: ');

        this.onMainContentLoaded?.next({ action: this.action, model: this.model,
            resourcePathAPI: this.resourcePathAPI, extraParams : this.extraParams });
    }

    redirect( path, extraParams: any ): void {
        this.onRedirectToPath.next( { component: this, action: this.action, model: this.model, path, extraParams });
    }

    configureDefaultProperties(data) {
        if (data !== undefined ) {
            console.info('[Form Bootstrap]:: Configurando os dataProperties...', data);

            for (const [item, value] of Object.entries( data )) {
                if ( item === 'extraParams' ) {
                    for (const [valueExtraParam, itemExtraParam] of Object.entries( data[item])) {
                        this.addExtraParams( itemExtraParam, valueExtraParam, false);
                    }
                } else if ( item === 'formExtraParams' ) {
                    data[item].forEach(itemFormExtraParams => {
                        this.addFormExtraParams( itemFormExtraParams);
                    });
                } else {
                    /*if ( this.hasOwnProperty(item) ) {*/
                        this[item] = value;
                  /* } else{
                        console.warn('[Form Bootstrap]:: Configurando os dataProperties, Propriedade não encontrada', item, value);
                    }*/
                }
            }

            // this.storage.retrieve(this.serviceName + '-' + this.currentPath + '-stateData');

            console.info('[Form Bootstrap]:: TESTANDO os dataProperties...', this.module);
        }
    }

    processDataToSend(formValue) {
        // @TODO verificar se essa validação do data é necessária
        // if ( !data ) { throw new Error('Dados de envio não inicializados ' ); }
        if (!this.model) {
            throw new Error('Model não inicializada ');
        }
        if (formValue !== null && formValue !== undefined) {
            Object.keys(formValue).forEach(key => {
                if (this.model.hasOwnProperty(key)) {
                    this.dataToSend[key] = formValue[key];
                } else if (typeof formValue[key] === 'object') {
                    this.processDataToSend(formValue[key]);
                }
            });
        }
    }

    prepareExtraParams(extraParams = null) {
        const extra = {};
        console.log('extraParams:::: ', extraParams);
        if (extraParams !== null) {
               this.pExtraParams = extraParams;
               console.log('this.pExtraParams:::: ', this.pExtraParams);
            } else {
                if ( this.pExtraParams !== undefined  && this.pExtraParams !== null ) {

                    if (this.pExtraParams.length !== undefined) {
                        this.pExtraParams.forEach(item => {
                            if (item !== null) {
                                if (item.inputForm === true) {
                                    item.value = this.formGroup.get(item.key).value;
                                }
                                extra[item.key] = item.value;
                            }
                        });
                    } else {
                        if (this.pExtraParams.key) {
                            extra[this.pExtraParams.key] = this.pExtraParams.value;
                        }
                    }
                }
                this.pExtraParams = extra;
        }
    }

    protected addFormExtraParams(key): void {
        this.addExtraParams(key, null , true );
    }

    protected addExtraParams(key, value, inputForm = false): void {
        if ( !this.pExtraParams ) {
            this.pExtraParams = [];
        }
        this.pExtraParams.push( {key, value, inputForm} );
    }



    private prepareDataAndSend(externalServiceName = null, externalModule = null , returnUrl = null,
                               resourceValue = null, extraParams = null, resourcePathAPI = null, state = null, dataToSend = null) {
        // Percorro a Model da instência do formulário
        if (!this.action) {
            throw new Error('Dados de envio não inicializados ');
        }
        this.dataToSend = dataToSend;

        if (this.dataToSend === null){
            if (this.formGroup !== undefined) {
                this.dataToSend = this.formGroup.value;
                this.processDataToSend(this.formGroup.value);
            } else if (extraParams !== undefined && extraParams !== null) {
                // this.processDataToSend(extraParams); // @todo ver quem tá usanndo isso.
            }
        }

        this.prepareExtraParams(extraParams);

        const  pResourcePathAPI = CoreUtils.prepareResourceValue( resourcePathAPI || this.resourcePathAPI, resourceValue, this.formGroup, this.model );

        console.log(' pResourcePathAPI ::', pResourcePathAPI);
        console.log(' this.model ::', this.model );

        console.log(' STATE ::', state );

        console.log(' resourcePathAPI >>>> ::', pResourcePathAPI );


        this.onPathChanged.next(pResourcePathAPI);

        if ( externalServiceName !== null ) {
            this.onModelDataOperation.next({
                action: this.action,
                model:  this.dataToSend,
                externalServiceName,
                module: externalModule,
                result: ['model'],
                extraParams: this.pExtraParams,
                returnUrl,
                resourcePathAPI : pResourcePathAPI,
                state
            });
        } else {
            this.onModelDataOperation.next(
                {
                    action: this.action,
                    model: this.dataToSend,
                    module: this.module,
                    extraParams: this.pExtraParams,
                    returnUrl: this.returnUrl,
                    resourcePathAPI : pResourcePathAPI,
                    state
                });
        }
    }
}
