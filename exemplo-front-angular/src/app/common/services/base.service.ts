import {Injectable, InjectionToken, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Promise, reject} from 'q';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {Page} from '../components/pagging/Page';
import {CoreAppInjector} from '../../../core/CoreAppInjector';
import {AlertService} from './alert.service';
import {CoreUtils} from "../../../core/utils/CoreUtils";


@Injectable({providedIn: 'root'})
export class BaseService implements  OnDestroy {

    modelList: any;
    page: Page;
    storage: LocalStorageService;
    onPathChanged: Subject<any>;
    onServiceNameChanged: Subject<any>;
    executeExternalService: Subject<any>;
    onModelListChanged: Subject<any>;
    onModelChanged: Subject<any>;
    onReloadDataprovider: Subject<any>;
    onCurrentModelChanged: Subject<any>;
    onModelDataOperation: Subject<any>;
    onRedirectOperation: Subject<any>;
    onRedirectToPath: Subject<any>;
    onMainContentLoaded: Subject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onRequestOperation: Subject<any>;
    onCloseModal: Subject<any>;
    onSelectedModelsChanged: BehaviorSubject<any>;
    onModelDataChanged: BehaviorSubject<any>;

    private alertService: AlertService;

    listModels: any[];
    model: any;
    returnUrl: string;
    resourcePathAPI = 'NOT_IMPLEMENTED';
    action = 'NOT_IMPLEMENTED';
    searchText: any;
    selectedModels: string[] = [];
    filterBy: string;
    @LocalStorage('service-name')
    serviceName = 'NOT_IMPLEMENTED';
    moduleName = 'NOT_IMPLEMENTED';
    externalServiceName = null;
    externalServices: any[] = [];
    externalRegisteredServices: any = {};

    protected http: HttpClient;

    httpOptions = {
        withCredentials: true,
        headers: new HttpHeaders(
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        )
    };

    protected requestActions = {
        find: 'getOneModel',
        get: 'getAll',
        create: 'saveModel',
        update: 'saveModel',
        delete: 'deleteModel'
    };

    unsubscribeAll: Subject<any>;
    public objServices: any;
    currentResourcePathAPI: string;


    constructor() {
        // Set the defaults
        this.onPathChanged = new Subject();
        this.onServiceNameChanged = new Subject();
        this.executeExternalService = new Subject();
        this.onModelListChanged = new Subject();
        this.onModelChanged = new Subject();
        this.onReloadDataprovider = new Subject();
        this.onCurrentModelChanged = new Subject();
        this.onSelectedModelsChanged = new BehaviorSubject([]);
        this.onModelDataChanged = new BehaviorSubject([]);
        this.onModelDataOperation = new Subject();
        this.onRedirectOperation = new Subject();
        this.onRedirectToPath = new Subject();
        this.onMainContentLoaded = new Subject();
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onRequestOperation = new Subject();
        this.onCloseModal = new Subject();
        this.unsubscribeAll = new Subject();

        this.page = new Page({size: 20});
        const injector = CoreAppInjector.getInjector();
        this.http = injector.get(HttpClient);
        this.storage = injector.get(LocalStorageService);
        this.alertService = injector.get(AlertService);

        // const service = injector.get(new InjectionToken<string>('ServiceAtendimento'));

        // console.log('serviceConfig::: ', service);

        this.init();
    }

    public init(): void {
        this.onModelDataOperation
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(operation => {
                console.info(' [onModelDataOperation] - Executing operation:: ', operation);
                this.storage.store('service-name', operation.externalServiceName || this.serviceName );
                this.returnUrl = operation?.returnUrl;
                if (operation.action !== undefined) {
                    this.executeRequest(operation);
                }
            });

        this.onPathChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(resourcePathAPI => {
                console.info(' 7.x - [DynamicComponent Bootstrap] - CurrentPath Changed:: ', resourcePathAPI);
                if (resourcePathAPI !== undefined) {
                    this.resourcePathAPI = resourcePathAPI;
                }
            });

        this.onServiceNameChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(serviceName => {
                console.info(' 7.x - [DynamicComponent Bootstrap] - ServiceName Changed:: ', serviceName);
                if (serviceName !== undefined) {
                    this.serviceName = serviceName;
                }
            });


    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: Error): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error('[ERROR] in operation: ', operation, error);

            // Let the app keep running by returning an empty result.
            // @ts-ignore
            return of(error as T);
        };
    }

    setPage = (page: Page) => {
        this.page = page;
    }

    create(model, resourcePathAPI = null): Observable<any> {
        return this.post(model, resourcePathAPI).pipe(
            tap(response => {
                console.log(`POST:: Get model`, response);
            } ),
            catchError(this.handleError<any>('POST model'))
            
        );
    }

    remove(id, resourcePathAPI = null): Observable<any> {
        return this.delete(id, resourcePathAPI);
    }

    update(model, resourcePathAPI = null): Observable<any> {
        return this.put(model, resourcePathAPI);
    }

    save(model: any, resourcePathAPI:any): Observable<any> {
        if(model.id === undefined && (model === null || model === undefined)){
            model = this.model;
        }
        if (model.id === null || this.action === 'create') {
            return this.create(model, resourcePathAPI );
        } else {
            return this.update(model, resourcePathAPI);
        }
    }


    getAll(resourcePathAPI = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;


        console.log('[GET_ALL] Loading resourcePath: ', this.resourcePathAPI);
        console.log('[GET_ALL] Loading resourcePath: ', resourcePathAPI);
        console.log('[GET_ALL] Loading resourcePath: ', resourcePath);
        this.verifyResourcePath(resourcePath);

        return this.get(resourcePath).pipe(
            tap(response => {
                console.log(`GET:: getAll`, response);
            }),
            catchError(this.handleError<any>('getAll'))
        );
    }

    private verifyResourcePath(resourcePath = null ) {
        if (resourcePath === 'NOT_IMPLEMENTED') {
            this.alertService.error('A Propriedade resourceApi não foi configurada para o serviço atual: '
                + this.serviceName, { seconds: 10 });
            return false;
            // throwError('A Propriedade resourceApi não foi configirada no componente atual.');
        }
    }


    getAllFromPath(resourcePathAPI: string = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;
        this.verifyResourcePath(resourcePath);
        return this.get(resourcePath).pipe(
            tap(response => {
                console.log(`GET:: getAllFromPath`);
            }),
            catchError(this.handleError<any>('getAllFromPath'))
        );
    }

    getById(id: number, resourcePathAPI: string = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;
        this.verifyResourcePath(resourcePath);
        return this.get(resourcePath, '/' + id).pipe(
            tap(response => {
                console.log(`GET:: getById`);
            }),
            catchError(this.handleError<any>('getById'))
        );
    }

    protected post(model, resourcePathAPI = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;
        this.verifyResourcePath(resourcePath);
        return this.http.post<any>(this.getUri(), model, this.httpOptions).pipe(
            tap(response => {
                // debugger
                console.log(`POST:: added model`);
                this.alertService.info(response === 200 ? 'Transação efetuada com sucesso!' : response);
            }),
            catchError(this.handleError<any>('addModel'))
        );
    }

    protected put(model, resourcePathAPI = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;
        this.verifyResourcePath(resourcePath);
        return this.http.put(this.getApi() + resourcePathAPI, model, this.httpOptions).pipe(
            tap(_ => {
                console.log(`updated model id=${model.id}`);
                this.alertService.info('Transação efetuada com sucesso!' );
                }
            ),
            catchError(this.handleError<any>('updateModel'))
        );
    }
// @TODO adicionar os querystrings (params)
    protected get(resourcePathAPI: string, params: string = null) {

        if ( null !== this.page && undefined !== this.page ) {
            let page = this.page.pageNumber ? this.page.pageNumber.toString() : '0';
            page = '?pageNumber=' + page + '&pageSize=' + this.page.size;
            resourcePathAPI = resourcePathAPI + page;
        }

        return this.http.get<any[]>(this.getApi() + resourcePathAPI, this.httpOptions).pipe(
            tap( value => {
                console.log(`[GET-MODEL]::  `, this.getApi(),  this.httpOptions, value )
            } )
        );
    }

    protected delete(id, resourcePathAPI = null) {
        const resourcePath  = typeof resourcePathAPI === 'string' ? resourcePathAPI : this.resourcePathAPI;
        this.verifyResourcePath(resourcePath);

        const url = this.getApi() + resourcePathAPI + '/' + id;
        console.log( 'DELETE');
        return this.http.delete<any>(url, this.httpOptions).pipe(
            tap(_ => console.log(`deleted model id=${id}`)),
            catchError(this.handleError<any>('deleteModel'))
        );
    }

    private getUri(): string {
        return `${environment.apiUrl}${environment.apiVersion}\/${this.resourcePathAPI}`;
        // return `${environment.apiUrl}${environment.apiVersion}\/${this.resourcePathAPI}${this.action}`;//por que tem no final a action?
    }

    private getApi(): string {
        return `${environment.apiUrl}${environment.apiVersion}\/`;
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Subscriber}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {

        const stateData = this.storage.retrieve(route.routeConfig.data.module + '-' + route.routeConfig.data.serviceName + '/' + route.routeConfig.path + '-stateData');
        this.resourcePathAPI = route.routeConfig.data.resourcePathAPI;
        this.moduleName = route.routeConfig.data.module;
        this.serviceName = route.routeConfig.data.serviceName;
        this.action = route.routeConfig.data.action;
        this.page.size = route.routeConfig.data.pageSize;
        this.page.pageNumber = route.routeConfig.data.pageNumber;

        if ( stateData ) {
            this.onModelDataChanged.next(stateData.model);
        }

/*        this.route.paramMap.subscribe(params => {
            console.log(params);

        });*/

        this.onSearchTextChanged.pipe(takeUntil(this.unsubscribeAll))
            .subscribe(searchText => {
            this.searchText = searchText;
            this.getModel();
        });

        this.onFilterChanged.pipe(takeUntil(this.unsubscribeAll))
            .subscribe(filter => {
            this.filterBy = filter;
            this.getModel();
        });



        // @todo remover daqui e colocar no CoreUtils
        this.onMainContentLoaded
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(requestAction => {

                console.info('8 - [Service onMainContentLoaded]  Checking if has a default API service ' +
                        'resolve...', requestAction);

                if ( requestAction.action !== undefined ) {
                    console.info('8.1 - [Service onMainContentLoaded] Resolving default API service',
                        'action: "' + requestAction.action + '" to internal action: "'
                        + this.requestActions[requestAction.action]) + '"';

                    requestAction.resourcePathAPI = CoreUtils.prepareResourceValue(requestAction.resourcePathAPI, null, null, null, this.storage);

                    const executor = (requestAction.action !== 'get' && requestAction.action !== 'find') ?
                        this[this.requestActions[requestAction.action]](requestAction.param || null, requestAction.resourcePathAPI || null) :
                        this[this.requestActions[requestAction.action]](requestAction.resourcePathAPI || null);
                    executor.subscribe(
                        (response: any) => {
                            console.info('8.2 - [Service onMainContentLoaded]  Receiving a response ' +
                                'from API service ' +
                                ' caled from RESOLVE...', response);
                            if (response) {
                            this.getResponseHeaders();

                            console.info('8.3 - [Service onMainContentLoaded] Checking with RESPONSE ' +
                                'is array or object and Setting the MODEL\'s with the value ' +
                                'of response from API service ' +
                                ' caled from RESOLVE...');

                            if ( response && ((Array.isArray (response) && response?.length !== undefined) || Object.keys(response).length > 0 || response.toString()?.length > 0)) {
                                if (Array.isArray(response)) {
                                    this.listModels = response;
                                    this.onModelListChanged.next(response);
                                } else {
                                    this.model = response;
                                    this.onModelChanged.next(response);
                                }


                            }
                            }
                    });
               /// return true;
            }
            // this.getModel();
        });

    }

    /**
     * Get model data
     *
     */
    getModelData(): void {
        this.getById(111)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((response: any) => {
                this.model = response;
                this.onModelDataChanged.next(this.model);
            }, reject);
    }

    /**
     * Get models
     *
     * @returns {Subscriber}
     */
    getModel(event = null): void {

        if (null !== event && undefined !== event.page && null !== this.page ) {
            this.page = event.page;
        }

        this.getAll()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((response: any) => {
                console.log('response:::: ', response );
                if (response) {
                    this.getResponseHeaders();
                    this.listModels = response;
                    if (this.searchText) {
                        this.listModels = this.listModels.filter(itemObj => {
                            // @TODO deixar o filtro dinâmico na API
                            if (itemObj.ano === this.searchText.ano || itemObj.titulo === this.searchText.titulo) {
                                return itemObj;
                            }
                        });
                    }
                    console.log('this.listModels:::: ', this.listModels);
                    this.onModelListChanged.next(this.listModels);
                }
            });
    }

    getOneModel() {
        return this.get( this.resourcePathAPI ).pipe(
            tap(response => { console.log(`GET:: Get model`); } ),
            catchError(this.handleError<any>('getOneModel'))
        );
    }

    getResponseHeaders = (): void => {
        const objPage = JSON.parse(localStorage.getItem('page'));
        this.page.totalElements = objPage ? objPage.totalElements as number : this.page.totalElements;
        this.page.size = this.page.size === 0 ? 1 : this.page.size;
        this.page.totalPages = Math.ceil(this.page.totalElements / this.page.size);
    }


    /**
     * Toggle selected model by id
     *
     * @param id
     */
    toggleSelectedModel(id): void {
        // First, check if we already have that model as selected...
        if ( this.selectedModels.length > 0 ) {
            const index = this.selectedModels.indexOf(id);
            if ( index !== -1 ) {
                this.selectedModels.splice(index, 1);
                // Trigger the next event
                this.onSelectedModelsChanged.next(this.selectedModels);
                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedModels.push(id);

        // Trigger the next event
        this.onSelectedModelsChanged.next(this.selectedModels);
    }

    /**
     * Select modelList
     *
     * @param filterParameter
     * @param filterValue
     */
    selectModels(filterParameter?, filterValue?): void {
        this.selectedModels = [];

        // If there is no filter, select all modelList
        if ( filterParameter === undefined || filterValue === undefined ) {
            this.selectedModels = [];
            this.modelList.map(model => {
                this.selectedModels.push(String(model.id));
            });
        }

        // Trigger the next event
        this.onSelectedModelsChanged.next(this.selectedModels);
    }

    saveModel( resourcePathAPI: any, model: any) {
        if (model.id === undefined && (model === null || model === undefined)){
                model = this.model;
        }
        if (model.id === null || this.action === 'create') {
            return this.createModel(model, resourcePathAPI);
        } else {
            return this.updateModel(model, resourcePathAPI);
        }
    }


    /**
     * Update model
     *
     * @param model
     * @returns {Promise<any>}
     */
    updateModel(model, resourcePathAPI) {
        return this.save(model, resourcePathAPI);
    }

    /**
     * Create model
     *
     * @param model
     * @returns {Promise<any>}
     */
    createModel(model, resourcePathAPI) {
        return this.save(model, resourcePathAPI);
    }

    /**
     * Update model data
     *
     * @param modelData
     *
     */
    updateModelData(modelData): void {
        this.update(modelData)
          /*  .pipe(takeUntil(this.unsubscribeAll))*/
            .subscribe(response => {
                // @TODO testar esse fluxo
                this.getModel();
            });
    }

    /**
     * Deselect modelList
     */
    deselectModels(): void {
        this.selectedModels = [];
        // @TODO testar esse fluxo
        // Trigger the next event
        this.onSelectedModelsChanged.next(this.selectedModels);
    }


    /**
     * Delete model
     *
     * @param model
     */
    deleteById(model): any {
        console.log('delete>>>>>> ', this.resourcePathAPI );
        this.delete(model.id)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(response => {
                console.log( 'DELETE');

                const modelIndex = this.modelList.indexOf(model);
                this.modelList.splice(modelIndex, 1);
                //  Acho que não é necessário  this.getModel();
                this.onRequestOperation.next(true);
            });

    }

    /**
     * Delete selected modelList
     */
    deleteSelectedModels(): void {
        for ( const id of this.selectedModels ) {
            this.delete(id)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(response => {
                    const model = this.modelList.find( imodel => {
                        return imodel.id === id;
                    });
                    const modelIndex = this.modelList.indexOf(model);
                    this.modelList.splice(modelIndex, 1);
                    this.deselectModels();
                });
        }

        this.getModel();
    }

    executeRequest( operation: any ): Subscription {
        // @TODO alterar o verbo para ser algo dinâmico: GET, POST, etc
        console.log('operations::: ', operation);
        const actionParts = operation.action.split('-');
        // Ver a possibilodade de mudar o 'action' para: find-user, update-user, create-user, delete-user
        this.action = actionParts[actionParts.length - 1];
        const requestAction = actionParts?.length > 0 ? this.requestActions[actionParts[0]] : undefined;
        if (!requestAction) {
            console.error('Ação não implementada corretamente! ' +
                'Ex: find (Find One Resource), get (Find All Resources), update, create, delete');
        }

        try {
            this.returnUrl =  operation.returnUrl;
            // console.log('operation>>>>>>>>>>> ', operation);
            return this[requestAction](operation.resourcePathAPI, operation?.model || null)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(response => {
                response = (response) ? (response.mockResult) ? JSON.parse(localStorage.getItem(response.mockResult))
                    : response : response;

                if ( response && ((Array.isArray (response) && response?.length !== undefined) || Object.keys(response).length > 0 || response.toString()?.length > 0)) {
                    this.onRequestOperation.next({
                        action: operation.action,
                        model: !Array.isArray (response) ? response : undefined,
                        listModels: Array.isArray (response) ? response : undefined,
                        extraParams: operation.extraParams,
                        module: operation.module,
                        returnUrl: operation.returnUrl,
                        state: operation.state
                    });
                } else {
                    this.alertService.error('Dados não encontrados!');
                    // this.loading = false;
                }
            });
        } catch (e) {
            console.warn('Não encontrei este RequestAction:::', this[requestAction], e);
        }
    }

    setCurrentComponentResult = (result: any, response: any) => {
        CoreUtils.getCurrentComponent()[result] = response;
    }

    public adjustDataProvider(dataProvider: any[]): any[]{
        return dataProvider;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
