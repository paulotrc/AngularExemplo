import { BaseUri } from '../base-uri';
import { ComponentFactory, ComponentFactoryResolver, forwardRef, ViewContainerRef } from '@angular/core';
import { Type } from '../../app/common/interfaces';
import { FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { IProviders } from '../interfaces/IProviders';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CoreConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { User } from '../../app/common/models';
import { timeout } from '../decorators/timeout,ts';
import { CoreAppInjector } from '../CoreAppInjector';
import { LocalStorageService } from 'ngx-webstorage';

export class CoreUtils {

    public static mainComponent: any;
    private static currentResourcePathAPI: string;

    public static storage = () => {
        return CoreAppInjector.getInjector().get(LocalStorageService);
    }

    static getCurrentComponent() {
        return CoreUtils.mainComponent.modelService.currentComponent;
    }


    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString(mainArr, searchText): any {
        if (searchText === '') {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj, searchText): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            const value = itemObj[prop];

            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            } else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr, searchText): boolean {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value, searchText): any {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string {
        function S4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    public static toggleInArray(item, array): void {
        if (array.indexOf(item) === -1) {
            array.push(item);
        } else {
            array.splice(array.indexOf(item), 1);
        }
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize(text): string {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    public static filterGroupByPrefix(value: string, dataProvider: any[]): any[] {
        if (value) {
            return dataProvider
                .map(group => ({ letter: group.letter, names: CoreUtils.filterPrefix(group.names, value) }))
                .filter(group => group.names.length > 0);
        }

        return dataProvider;
    }

    public static filterPrefix = (opt: string[], value: string): string[] => {
        const filterValue = value.toLowerCase();
        return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
    }

    public static capitalizeWords(str: string, separator = ' ') {
        const arrToConvert: string[] = str.split(separator);
        let strToConvert = '';

        for (let i = 0, len = arrToConvert.length; i < len; i++) {
            strToConvert += CoreUtils.capitalize(arrToConvert[i].toLowerCase()) + separator;
        }

        return strToConvert.trim();
    }

    public static capitalize = (str: string): string => {
        if (undefined === str || '' === str) {
            return '';
        }
        return str[0].toUpperCase() + str.substr(1);
    }

    public static toCamelCase(str: string, separator: string = '-') {
        if (undefined === str) {
            return '';
        }
        const arrToConvert: string[] = str.split(separator);
        let strToConvert = '';
        for (let i = 0, len = arrToConvert.length; i < len; i++) {
            strToConvert += (i === 0) ? arrToConvert[i].toLowerCase() :
                CoreUtils.capitalize(arrToConvert[i].toLowerCase());
        }
        return strToConvert;
    }

    public static parsingURI = (str: string): BaseUri => {
        /*
            http://localhost:80/app-api/v1
            http://localhost:80/app-api/v1/samples
            http://localhost:80/app-api/v1/samples/{teste}
            http://localhost:80/app-api/v1/samples/{222222}/listagem

            http://localhost:80/app-api/v1/samples/{teste}/listagem
            http://localhost:80/app-api/v1/samples/{teste}/listagem?opa=1
            http://localhost:80/app-api/v1/samples/{teste}/listagem?opa=1&opa2=2
            http://localhost:80/app-api/v1/samples/{teste}/listagem?opa=1&opa2=2&opa3=3
        */

        /*const regex = /^(http[s]?|ftp):\/\/([^:\/\s]+):?([\d]+)?\/([-A-Za-z0-9]+[-A-Za-z0-9]+)\/?([v\d]*)?\/?([\w-*]*){1}\/?([[\d|\w]*]?)?([{?[A-Za-z0-9]?[-[A-Za-z0-9]+]?}?]?)?\/([A-Za-z0-9]+[-[A-Za-z0-9]+]?)(\?[A-Za-z0-9]+[-[A-Za-z0-9]+=[A-Za-z0-9]]?[&[[\w=]*]*)*!/gmi;
        const match: RegExpExecArray = regex.exec(str);*/
        const objUri: any = {};
        objUri.url = str;
        const urlAndHashtag = str.split('#');
        const match = urlAndHashtag[0].split('//').join('').split(':').join('/').split('/');
        let pathValueAndParams: any;
        let pathAndParams: any;
        let resourceAndParams: any;
        let relationValueAndParams: any;
        let resourceValueAndParams: any;
        let path: any;
        let params: any;

        console.log('matchXXX>> ', match);


        const resource = resourceAndParams !== undefined ? resourceAndParams[0] : undefined;


        pathAndParams = match[5].split('?');

        path = pathAndParams[0];

        pathValueAndParams = match.length === 7 ? match[6].split('?') : undefined;

        resourceAndParams = match.length >= 8 ? match[7].split('?') : undefined;

        resourceValueAndParams = match.length >= 9 ? match[8].split('?') : undefined;

        const pathValue = (pathValueAndParams !== undefined) ? pathValueAndParams[0] : undefined;

        const resourceValue = (resourceValueAndParams !== undefined) ? resourceValueAndParams[0] : undefined;

        const relation = match.length >= 10 ? match[9] : undefined;

        relationValueAndParams = match.length === 8 ? match[7].split('?') : undefined;
        const relationValue = (relationValueAndParams !== undefined) ? relationValueAndParams[0] : undefined;


        params = (params === undefined && pathAndParams !== undefined) ? pathAndParams[1] : params;

        params = (params === undefined && pathValueAndParams !== undefined) ? pathValueAndParams[1] : params;

        params = (params === undefined && resourceAndParams !== undefined) ? resourceAndParams[1] : params;

        params = (params === undefined && relationValueAndParams !== undefined) ? relationValueAndParams[1] : params;


        objUri.protocol = match[0];
        objUri.host = match[1];
        objUri.port = match[2];
        objUri.context = match[3];
        objUri.version = match[4];
        objUri.path = path;
        objUri.pathValue = pathValue;
        objUri.resource = resource;
        objUri.resourceValue = resourceValue;
        objUri.relation = relation;
        objUri.relationValue = relationValue;
        objUri.params = params;
        objUri.hashtag = urlAndHashtag.length > 1 ? urlAndHashtag[1] : undefined;

        console.log('URIXXX>>', objUri);

        const baseUri: BaseUri = new BaseUri({});
        baseUri.uri = objUri.url;
        baseUri.protocol = objUri.protocol;
        baseUri.host = objUri.host;
        baseUri.port = objUri.port;
        baseUri.context = objUri.context;
        baseUri.path = objUri.path;
        baseUri.pathValue = objUri.pathValue;
        baseUri.version = objUri.version;
        baseUri.resource = objUri.resource;
        baseUri.relation = objUri.relation;
        baseUri.resourceValue = objUri.resourceValue;
        baseUri.relationValue = objUri.relationValue;
        baseUri.params = objUri.params;
        baseUri.hashtag = objUri.hashtag;

        return baseUri;
    }

    public static parsingParams = (str: string): any => {

        if (str === undefined || str.trim() === null) {
            console.error('Não há parâmetros na requisição atual');
            return str;
        }

        const objParams = {};
        const regex = /[^?=&]+=[^&]*/gm;
        let m;
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                const arrMatch = match.split('=');
                objParams[arrMatch[0]] = arrMatch[1];

            });
        }
        return objParams;
    }

    public static openResult = <T, M, C>(component: Type<T>, resolver: ComponentFactoryResolver, entry: ViewContainerRef,
        componentRef: any,
        moduleName,
        currentPath,
        action: string = '',
        model: M = null,
        extraParams: C = null,
        extraParamsFromParent = null,
        modelService, state = null): void => {

        CoreUtils.openComponent(resolver.resolveComponentFactory(component), entry, componentRef, moduleName,
            currentPath, action, model, extraParams, extraParamsFromParent, modelService, state);
    }

    public static openComponent = <M, T>(factory: ComponentFactory<any>,
        entry: ViewContainerRef,
        componentRef: any,
        moduleName, currentPath,
        action: string = null,
        model: M = null,
        extraParams: T,
        extraParamsFromParent,
        modelService,
        state: string = null) => {

        console.info('5 - [Main Bootstrap] Opening Dynamic Component...', CoreUtils.currentResourcePathAPI);
        console.info('5 - [Main Bootstrap] Opening Dynamic Component... MODEL:: ', model);

        entry.clear();
        componentRef = entry.createComponent(factory);
        componentRef.instance.action = action.trim();
        componentRef.instance.state = state;
        componentRef.instance.model = model;
        componentRef.instance.currentPath = currentPath;
        componentRef.instance.moduleName = moduleName;
        componentRef.instance.modelService = modelService;
        componentRef.instance.extraParams = extraParams;
        componentRef.instance.extraParamsFromParent = modelService.storage.retrieve('extraParamsFromParent');
        componentRef.instance.resourcePathAPI = CoreUtils.currentResourcePathAPI;

        // CoreUtils.verifyPath(CoreUtils.mainComponent, componentRef.instance.resourcePathAPI);

        console.log('STATE A ser monitorado ( ' + componentRef.instance.moduleName + '-' + currentPath + '-stateData)');
        // siiga.cliente-clientes/detail-clientes-stateData


        console.info('5 - [Main Bootstrap] STATE-DATA...', componentRef.instance.moduleName
            + '-' + currentPath + '-stateData');

        // @TODO, revisar a necessidade disso;
        // componentRef.instance.extraParams.push(extraParamsFromParent);

        componentRef.instance.openModal = (compForModal, pModel, messageOnExit, pAction, pState, dialogTitle) => {
            return CoreUtils.openRegisterFormInModal(CoreUtils.mainComponent, pModel, compForModal,
                messageOnExit, pAction, pState, dialogTitle);
        };


        console.info('6 - [Main Bootstrap] Setting default properties in Dynamic Component... (action: ' + action.trim() + ', ' +
            'state: ' + state + ', model:  ' + model + ', ' + ' extraParams:  ' + extraParams + ')...');


        // CoreUtils.onModelDataChanged( componentRef.instance );


        // if ( onModelDataOperation ) {
        componentRef.instance.onModelDataChanged = modelService.onModelDataChanged; // Subject<any> = null
        componentRef.instance.onModelChanged = modelService.onModelChanged;



        componentRef.instance.onModelDataOperation = modelService.onModelDataOperation;
        componentRef.instance.onPathChanged = modelService.onPathChanged;
        componentRef.instance.onRedirectOperation = modelService.onRedirectOperation;
        componentRef.instance.onRedirectToPath = modelService.onRedirectToPath;
        componentRef.instance.onMainContentLoaded = modelService.onMainContentLoaded;
        componentRef.instance.executeExternalService = modelService.executeExternalService;
        // @todo revisar isso
        CoreUtils.mainComponent.modelService.currentComponent = componentRef.instance;

        CoreUtils.onRedirectOperation(componentRef.instance);
        CoreUtils.onRedirectToPath(componentRef.instance);
        CoreUtils.onModelChanged(componentRef.instance);

        console.info('7 - [Main Bootstrap] Setting default Subscribers in Dynamic Component... (onModelDataOperation, ' +
            'onServiceNameChanged, onPathChanged, onRedirectOperation)...');
        // }

        componentRef.instance.storage.observe(componentRef.instance.moduleName + '-' + currentPath + '-stateData')
            .pipe(takeUntil(componentRef.instance.unsubscribeAll))
            .subscribe((newValue) => {
                /*console.log('STATE alterado ( ' + componentRef.instance.moduleName + '-' + currentPath + '-stateData)', newValue);*/
                componentRef.instance.model = newValue.model;
                componentRef.instance.extraParamsFromParent = newValue.extraParams;
            });


    }

    public static hasValue = (form: FormGroup, field: string): boolean => {
        return form.get(field).value != null;
    }

    public static destroyComponent = (componentRef: any): void => {
        componentRef.destroy();
    }

    public static subformComponentProviders = (
        component: any,
    ): IProviders[] => {
        return [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => component),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => component),
                multi: true,
            }
        ];
    }

    public static getFormValidationErrors = (form: FormGroup) => {
        const result = [];
        Object.keys(form.controls).forEach(key => {

            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors) {
                Object.keys(controlErrors).forEach(keyError => {
                    result.push({
                        control: key,
                        error: keyError,
                        value: controlErrors[keyError]
                    });
                });
            }
        });

        return result;
    }

    public static generateMaskNumbers = (num) => {
    }

    public static getTypeFromArray = (arrTypes: any[], strType) => {
        let result: any = null;
        arrTypes.forEach(item => {
            if (item.prototype.constructor.name === strType) {
                result = item;
            }
        });
        return result;
    }

    public static trim(value: string): string {
        return value.replace(/\s/g, '');
    }

    public static constructComponent = <M, C, T>(component: Type<T>, entry, componentRef, modelService, resolver, moduleName,
        currentPath, action: string = '', model: M = null,
        extraParams: C = null, extraParamsFromParent = null, state) => {

        console.info('4 - [Main Bootstrap] Constructing Dynamic Component...');

        let factory: ComponentFactory<any>;
        factory = resolver.resolveComponentFactory(component);

        CoreUtils.openComponent(factory, entry, componentRef, moduleName, currentPath, action, model, extraParams,
            extraParamsFromParent, modelService, state);
    }

    public static openDynamicResult = async (operation, resolver, entry, componentRef, state = null) => {
        console.log('operation.action::: ', operation);
        const module = await import('../../app/main/private/' + operation.module + '/components/results/result-'
            + operation.action + '/result-' +
            operation.action + '.component');
        console.log('operation.action::: ', operation.action);
        const resultComponent = 'Result' + CoreUtils.capitalize(CoreUtils.toCamelCase(operation.action)) + 'Component';

        const extraParamsFromParent = CoreUtils.mainComponent.modelService.storage.retrieve('extraParamsFromParent');

        CoreUtils.openResult(module[resultComponent],
            resolver, entry, componentRef, operation.module, operation.currentPath, operation.action,
            operation.model, operation.extra, extraParamsFromParent, CoreUtils.mainComponent.modelService,
            operation.state);


        /*        component: Type<T>, resolver: ComponentFactoryResolver, entry: ViewContainerRef,
                    componentRef: any,
                    moduleName,
                    currentPath,
                    action: string = '',
                    model: M = null,
                    extraParams: C = null , onModelDataOperation: Subject<any> = null ,
                    onModelDataChanged: Subject<any> = null*/


    }

    public static constructDialog = <T>(dialog, component: new (...args: any[]) => T, data: any): MatDialogRef<T, any> => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const dialogRef = dialog.open(component, dialogConfig);
        return dialogRef;
    }

    public static openGenericDialog = <C>(dialog, C, data) => {
        const dialogRef = CoreUtils.constructDialog(dialog, C, data);
    }

    public static onModelListChanged = (component, identifier = 'id') => {
        component.modelService.onModelListChanged
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(responseModel => {
                try {
                    component.clear();
                } catch (e) {
                    console.error('Erro ao executar o comando clear()', e);
                    // @TODO - Cesar Draw, como tratar isso?
                }
                component.listModels = component.modelService.adjustDataProvider(responseModel);

                // ## Isso carrega a model da tela de renogociação que tá quebrada.
                // component.model = responseModel;
                console.log('onModelListChanged:::: ', component.listModels, component, component.modelService.page);
                // component.listModels = component.listModels.concat(listModels);
                // component.cd.markForCheck();
                component?.updateDataProvider(component.modelService.page);
                component.checkboxes = {};
                // @todo verfificar se os checkboxes estão funfando.

                if (component.checkboxes !== undefined) {
                    responseModel.map(model => {
                        if (model[identifier]) {
                            component.checkboxes[model[identifier]] = false;
                        }
                    });
                }


                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = false;
                }
            });
    }

    public static onModelChanged = (component) => {
        component.modelService.onModelChanged
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(responseModel => {
                component.model = responseModel;
                console.log('onModelChanged:::: ', component.model, component);
                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = false;
                }
            });
    }

    public static onModelDataChanged = (component) => {

        component.modelService.onModelDataChanged
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(model => {
                console.log('onModelDataChanged::: ', model);
                component.model = model;
                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = false;
                }
            });
    }

    public static onFilterChanged = (component) => {
        component.modelService.onFilterChanged
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(() => {
                component.modelService.deselectModels();
            });
    }

    public static registerExternalService = (objConfigService) => {

        /*        for ( const itemService of objConfigService.externalServices ) {
                    objConfigService.modelService.externalServices.push(itemService);
                }*/

        console.info(' 7.x - [DynamicComponent Bootstrap] - objConfigService:: ', objConfigService.modelService.externalServices);

        objConfigService.modelService.executeExternalService
            .pipe(takeUntil(objConfigService.modelService.unsubscribeAll))
            .subscribe(operation => {


                console.info(' 7.x - [DynamicComponent Bootstrap] - objConfigService:: ', objConfigService.externalServices);

                console.info(' 7.x - [DynamicComponent Bootstrap] - External Operation Executed:: ', operation);
                console.info(' 7.x - [DynamicComponent Bootstrap] - External Service Executed:: ', operation.serviceInstanceName);

                if (objConfigService.externalServices.length > 0) {

                    const serviceInstanceMethod: any = objConfigService.externalServices.filter(serviceInstance => {
                        return serviceInstance.module === operation.module && serviceInstance[operation.serviceInstanceName] !== undefined;
                    }).map(obj => {
                        console.info(' 7.x - [DynamicComponent Bootstrap] - serviceInstance:: ', obj[operation.serviceInstanceName]);
                        return obj[operation.serviceInstanceName][operation.method];
                    })[0];

                    if (serviceInstanceMethod !== undefined) {
                        console.info(' 7.x - [DynamicComponent Bootstrap] - serviceInstance:: ', serviceInstanceMethod);

                        serviceInstanceMethod(operation.result);
                    }
                }
            });
    }

    public static onSelectedModelsChanged = (component, selectedItens = 'selectedModels') => {
        component.modelService.onSelectedModelsChanged
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(selectedModelItens => {
                if (undefined !== component.hasSelectedItens) {
                    component.hasSelectedItens = selectedModelItens.length > 0;
                }

                if (undefined !== component.checkboxes) {
                    for (const id in component.checkboxes) {
                        if (!component.checkboxes.hasOwnProperty(id)) {
                            continue;
                        }

                        component.checkboxes[id] = selectedModelItens.includes(id);
                    }
                }
                if (undefined !== component[selectedItens]) {
                    component[selectedItens] = selectedModelItens;
                }

                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = false;
                }


            });
    }

    public static onSearchInputChanged = (component, fields: any[]) => {
        component.searchInput.valueChanges
            .pipe(
                takeUntil(component.unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = true;
                }
                const obj = {};
                let countValues = 0;
                fields.forEach(item => {
                    obj[item.name] = (document.getElementById(item.elementId) as HTMLInputElement).value.trim();
                    if (obj[item.name] !== '') {
                        countValues++;
                    }

                });
                if (countValues > 0) {
                    component.modelService.onSearchTextChanged.next(obj);
                }
            });
    }

    public static onRequestOperation = (component) => {
        console.info('0.2 - [Main Bootstrap] onRequestOperation Observer Created in ' +
            component.constructor.name + '.');

        component.modelService.onRequestOperation
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(operation => {
                console.info('Service OperationHandler:: onRequestOperation Observer called with operation:: ',
                    operation);
                const returnUrl = operation.returnUrl || component.modelService.returnUrl;
                if (returnUrl !== undefined) {
                    if (operation.action !== 'create' && operation !== 'update') {
                        console.log(' STORING STATE DATA::: ' + operation.module + '-' + returnUrl + '-stateData');

                        component.modelService.storage.store(operation.module + '-' + returnUrl
                            + '-stateData', {
                            model: operation?.model,
                            listModel: operation?.listModel,
                            extraParams: operation?.extraParams,
                            state: operation.state
                        });
                    }
                    console.info('Service OperationHandler:: Calling Router.navigate with URL: '
                        + '/' + returnUrl);

                    component.router.navigate(['/' + returnUrl]);

                } else {

                    if (operation.action !== 'create' || operation !== 'update') {
                        if (Array.isArray(operation.model)) {
                            component.modelService.listModels = operation?.model;
                            component.modelService.onModelListChanged.next(operation?.model);
                        } else {
                            component.modelService.model = operation?.model;
                        }
                    } else {
                        operation.model = null;
                    }


                }

                /*else {
                    CoreUtils.openDynamicResult(operation, component.resolver, component.entry, component.componentRef);
                    console.info('Service OperationHandler:: Opening openDynamicResult...',
                        operation );
                }*/
            });

    }

    public static onRedirectOperation = (component) => {
        console.info('Service Bootstrap:: onRedirectOperation Observer Created in ' +
            component.constructor.name + '.');

        component.modelService.onRedirectOperation
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(operation => {
                console.log('>>>OOOOOOOO>>> ', operation);
                if (component.modelService.returnUrl) {
                    component.router.navigate([component.modelService.returnUrl]);
                } else {
                    CoreUtils.openDynamicResult(operation, component.resolver, component.entry, component.componentRef);
                }
            });

    }

    public static onRedirectToPath = (component) => {
        console.info('Service Bootstrap:: onRedirectToPath Observer Created.');

        component.modelService.onRedirectToPath
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(operation => {
                operation.component.storage.store('extraParamsFromParent', operation.extraParams);
                // const stateData = mainComponent.modelService.storage.retrieve(moduleName + '-' + mainComponent.modelService.serviceName + '/' + currentPath + '-stateData');
                operation.component.router.navigate([operation.path]);
            });

    }

    public static closeModalOnRequestOperation = (component, childComponent = null) => {
        console.info('Service Bootstrap:: closeModalOnRequestOperation Observer Created in ' +
            component.constructor.name + '.');

        component.modelService.onRequestOperation
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(() => {
                if (undefined !== component.dialogRef) {
                    console.log('FECHANDO');
                    component.dialogRef.close();
                }
                if (undefined !== childComponent?.dialogRef) {
                    console.log('FECHANDO');
                    component.dialogRef.close();
                }
            });

        /*        if (childComponent !== null) {
                    childComponent.onRequestOperation = component.modelService.onRequestOperation;
                }*/
    }

    public static onCloseModal = (component) => {

        console.info('Service Bootstrap:: onCloseModal Observer Created in ' +
            component.constructor.name + '.');

        component.modelService.onCloseModal
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(() => {
                if (undefined !== component.dialogRef) {
                    console.log('FECHANDO Modal...');
                    component.dialogRef.close();
                }
            });
    }

    public static onModelDataOperation = (component) => {

        console.info('Service Bootstrap:: onModelDataOperation Observer Created in ' +
            component.constructor.name + '.');

        component.modelService.onModelDataOperation
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(operation => {
                if (operation.externalServiceName !== null) {
                    component.modelService.externalServiceName = operation.externalServiceName;
                }


                if (undefined !== component.modelService[operation.action]) {
                    if (operation.action === 'delete') {
                        component?.delete(operation.model);
                        CoreUtils.deleteConfirmation(component, component.model);
                    } else {
                        component.modelService[operation.action](operation.model);
                    }
                }
            });
    }

    public static closeAndConfirm = (component, text: string) => {

        console.info('Service Bootstrap:: closeAndConfirm Observer Created in ' +
            component.constructor.name + '.');

        component.confirmDialogRef = component.matDialog.open(CoreConfirmDialogComponent, {
            disableClose: false
        });

        component.confirmDialogRef.componentInstance.confirmMessage = text;
        component.confirmDialogRef.beforeClosed().subscribe(answer => { // @TODO coocar .pipe(takeUntil(this.unsubscribeAll))
            if (answer === true) {
                component.dialogRef.close();
                component.dialogRef = null;
            }
            component.confirmDialogRef = null;
        });
    }

    public static openRegisterFormInModal = <F>(component, model, dinamicComṕonent: Type<F>, text: string, action, state, dialogTitle) => {

        console.info('Service Bootstrap:: openRegisterFormInModal Observer Created in ' +
            component.constructor.name + '.');
        component.dialogRef = component.matDialog.open(dinamicComṕonent, {
            data: {
                model,
                action,
                state,
                dialogTitle,
                onModelDataOperation: component.modelService.onModelDataOperation,
                onCloseModal: component.modelService.onCloseModal,
                onPathChanged: component.modelService.onPathChanged
            },
            disableClose: false
        });

        //component.dialogRef.backdropClick().subscribe(() => { // @TODO coocar .pipe(takeUntil(this.unsubscribeAll))
        //    CoreUtils.closeAndConfirm(component, text);
        //});
    }

    public static deleteConfirmation = (component, model, text: string = null) => {

        console.info('Service Bootstrap:: deleteConfirmation Observer Created in ' +
            component.constructor.name + '.');

        component.confirmDialogRef = component.matDialog.open(CoreConfirmDialogComponent, {
            disableClose: false
        });

        component.confirmDialogRef.componentInstance.confirmMessage = text || 'Tem certeza de que deseja excluir?';

        component.confirmDialogRef.beforeClosed().subscribe(result => { // @TODO coocar .pipe(takeUntil(this.unsubscribeAll))
            if (result) {
                component.modelService.deleteById(model);
            }
            component.confirmDialogRef = null;
        });

    }

    public static toggleStar = (component, modelId): void => {
        if (component.model.starred.includes(modelId)) {
            component.model.starred.splice(component.model.starred.indexOf(modelId), 1);
        } else {
            component.model.starred.push(modelId);
        }

        component.modelService.updateModelData(component.model);
    }

    // @TODO ver quem mais está usando esse método
    public static loadDynamicComponent = (parentComponent, modelType, moduleName, parentPath, dynamicName, currentPath,
        action = '', model = null, extraParams = null,
        extraParamsFromParent = null, state = null): void => {
        (async () => {
            const module = await import('../../app/main/private/' + moduleName + '/components/'
                + parentPath + '/' + dynamicName + '/' + dynamicName + '.component');

            console.info('3 - [Main Bootstrap] Loading Dynamic Component:: ', modelType);

            parentComponent.formLoaded = true;


            CoreUtils.constructComponent(module[modelType],
                parentComponent.entry,
                parentComponent.parentComponentRef,
                parentComponent.modelService,
                parentComponent.resolver, moduleName, currentPath, action, model, extraParams, extraParamsFromParent, state);
        })();
    }


    static generateFakeUser(user) {
        user.token = 'fake-jwt-token';
        user.username = 'c891307';
        user.password = 'aOq0D5P5';
        user.firstName = 'Usuário de Teste';
        user.lastName = 'SIIGA';
        user.id = CoreUtils.generateGUID();
        console.info('0.1 - [FAKE Bootstrap] FakerUser created...', user);
        return user;
    }

    static getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    @timeout(1000)
    static dynamicRedirect(mainComponent, moduleName = null, model = null) {
        CoreUtils.mainComponent = mainComponent;
        const currentPath = mainComponent.currentPath;
        CoreUtils.currentResourcePathAPI = mainComponent.modelService.resourcePathAPI;

        moduleName = moduleName || mainComponent.modelService.moduleName;

        let parentPath = '';
        let prefixName = '';
        let dynamicName = currentPath;
        let modelType: string;

        const regexSearch = /search/gm;
        const regexDetail = /detail/gm;
        const reportDetail = /report/gm;
        const reportForm = /form/gm;
        const searchPathName = regexSearch.exec(currentPath);
        const detailPathName = regexDetail.exec(currentPath);
        const reportPathName = reportDetail.exec(currentPath);
        const formPathName = reportForm.exec(currentPath);

        if (detailPathName !== null) {
            parentPath = 'details';
            // prefixName = 'Detail';
        } else if (searchPathName !== null) {
            parentPath = 'searchs';
            // prefixName = 'Search';
        } else if (reportPathName !== null) {
            parentPath = 'reports';
            // prefixName = 'Search';
        } else if (formPathName !== null) {
            parentPath = 'forms';
        } else {
            parentPath = 'forms';
            prefixName = 'Form';
            dynamicName = 'form-' + dynamicName;
        }

        console.info('1 -[Main Bootstrap] :: ', mainComponent.activatedRoute.routeConfig);
        console.info('1 -[Main Bootstrap] Current Path:: ', mainComponent.currentPath);

        modelType = prefixName + CoreUtils.capitalize(CoreUtils.toCamelCase(currentPath)) + 'Component';

        console.info('2 -[Main Bootstrap] Dynamic Redirect to :: ', modelType);
        // console.log(' STORING STATE DATA::: ' + operation.module + '-' + returnUrl + '-stateData');

        const stateData = mainComponent.modelService.storage.retrieve(moduleName + '-' + mainComponent.modelService.serviceName + '/' + currentPath + '-stateData');

        let extraParamsFromParent = null;
        const extraParams = mainComponent.activatedRoute.routeConfig.extraParams;

        if (stateData !== null) {
            model = stateData.model;
            extraParamsFromParent = stateData.extraParams;
        }

        console.info('2 -[Main Bootstrap] STATE stateData :: ', stateData);

        CoreUtils.loadDynamicComponent(mainComponent, modelType, moduleName, parentPath, dynamicName, currentPath,
            mainComponent.modelService.action, model, extraParams, extraParamsFromParent, stateData?.state);
    }

    static verifyPath(component, resourcePathAPI: string) {
        console.info('0.1 - [Main Bootstrap] Checking resourcePathAPI and returning component.resourcePathAPI: ' + resourcePathAPI
            + ' or component.activatedRoute.routeConfig.resourcePathAPI: ' + component.activatedRoute.routeConfig.resourcePathAPI);
        return component.activatedRoute.routeConfig.path || resourcePathAPI;
    }

    static onReloadDataprovider(component) {
        component.modelService.onReloadDataprovider
            .pipe(takeUntil(component.modelService.unsubscribeAll))
            .subscribe(listModels => {
                component?.clear();
                if (undefined !== component.loadingIndicator) {
                    component.loadingIndicator = true;
                }
            });
    }

    static prepareResourceValue = (defaultResourcePathAPI, resourceValue = null, formGroup = undefined,
        model = undefined, storage = null): string | false => {
        const regex = /{([A-Za-z0-9]+[-|.[A-Za-z0-9]+]?|\|?[[A-Za-z0-9]+[-[A-Za-z0-9]+]?)}/gm;

        const pathItem = regex.exec(defaultResourcePathAPI);

        if (pathItem !== null) {
            const hasPipe = pathItem[1].split('|');
            if (hasPipe.length === 1) {
                if (formGroup !== null && formGroup !== undefined && formGroup.controls[hasPipe[0]].value !== null) {
                    resourceValue = formGroup.controls[hasPipe[0]].value;
                }
            } else {
                const properties = hasPipe[0].split('.'); // Ex: currentUser.id
                if (properties.length > 1) {
                    resourceValue = storage.retrieve(properties[0]) ? storage.retrieve(properties[0])[properties[1]] : null;
                    if (resourceValue === null && properties[1] === 'cpfCnpj') {
                        if (storage.retrieve('currentClient') != null) {
                            resourceValue = storage.retrieve('currentClient')[properties[1]];
                        }
                    }
                } else {
                    resourceValue = storage.retrieve(properties[0]); // ex: userId
                }
            }

            if (undefined === resourceValue) {
                console.error('FormGroup não configurado corretamente! Ex:  [(ngModel)]="model.id"', model);
                return false;
            }

            defaultResourcePathAPI = defaultResourcePathAPI
                .replace('{' + pathItem[1] + '}', resourceValue);
        }

        defaultResourcePathAPI = defaultResourcePathAPI.replace('//', '/');

        return defaultResourcePathAPI;

    }

    public static getFormattedPrice(value: any) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    public static getFormattedPercent(value: any) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(value).substring(2).trim();
    }

    public static removerAcentos(texto) {
        const comAcentos = 'ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç';
        const semAcentos = 'AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc';

        for (let i = 0; i < comAcentos.length; i++) {
            texto = texto.replace(comAcentos[i], semAcentos[i]);
        }
        return texto.replace(/ /g, '');
    }
    public static fecharModalForce() {
        const list = document.getElementsByClassName("mat-dialog-container");
        [].forEach.call(list, function (el) {
            el.style.display = 'none'
        });
        const listbackdrop = document.getElementsByClassName("cdk-overlay-backdrop");
        [].forEach.call(listbackdrop, function (el) {
            el.style.display = 'none'
        });
    }
}




