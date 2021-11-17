import {HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CoreUtils} from '../../../../core/utils/CoreUtils';
import {BaseUri} from '../../../../core/base-uri';
import {Page} from '../../components/pagging/Page';
import {ClientesMock} from '../fake-db/mocks/clientes/ClientesMock';

export class BaseApi<T> {
    request: HttpRequest<any>;
    resourceName: string;
    mockModel: T;
    model: any;
    modelList: any[];
    baseUri: BaseUri;
    protected headers = {};
    protected response: HttpResponse<unknown>;


    constructor() {
        this.modelList = JSON.parse(localStorage.getItem(this.resourceName + 'List')) || [];
    }


    doGet(): any {
        // get models
        if ( this.request.url.endsWith( '/' + this.resourceName) && this.request.method === 'GET') {
            return of(new HttpResponse({status: 900, body: this.modelList }));
        }
    }

    doGetById(): any {
        // get model by id
        const re = new RegExp('/\/' + this.resourceName + '\/\d+$/');
        if (this.request.url.match(re) && this.request.method === 'GET') {
            // find user by id in users array
            const urlParts = this.request.url.split('/');
            const id = urlParts[urlParts.length - 1];
            const matchedModels = this.modelList.filter( pModel => pModel.id === id);
            const model = matchedModels.length ? matchedModels[0] : null;

            return of(new HttpResponse({status: 200, body: model}));
        }
    }

    doPost(id= 'id' ): Observable<HttpEvent<T>> {
        // get models
            // get new model object from post body
            const newModel = this.request.body;

            // save new model
            newModel[id] = newModel[id] || CoreUtils.generateGUID();

            this.modelList = this.modelList.filter((item, index, arr) => item[id] + '' !== newModel[id] + '' );


            this.modelList.push(newModel);

            localStorage.setItem( CoreUtils.parsingURI( this.request.url ).path + 'List',
                JSON.stringify(this.modelList));

            // respond 200 OK
            return of(new HttpResponse({status: 200}));
    }

    doPut(): any {
        // get models
        if ( this.request.url.endsWith( '/' + this.resourceName) && this.request.method === 'PUT') {

            // find user by id in users array

            const newModel = this.request.body;
            for (let i = 0; i < this.modelList.length; i++) {
                const model = this.modelList[i];
                if (model.id === newModel.id) {
                    // delete model
                    this.modelList.splice(i, 1);
                    this.modelList.push(newModel);
                    localStorage.setItem(this.resourceName + 'List', JSON.stringify(this.modelList));
                    break;
                }
            }

            return of(new HttpResponse({status: 200}));
        }
    }

    doDelete(id): any {
        // delete model
        const re = new RegExp('/\/' + this.resourceName + '\/\w+$/gi');
        if ( this.request.url.match(re) && this.request.method === 'DELETE') {

            // find model by id in models array
            const urlParts = this.request.url.split('/');
            // const id = urlParts[urlParts.length - 1];

            console.log('DELETE +++++ ' + this.request.method + ' ::::: ', id );

            for (let i = 0; i < this.modelList.length; i++) {
                const model = this.modelList[i];
                if (model.id === id) {
                    // delete model
                    this.modelList.splice(i, 1);
                    localStorage.setItem(this.resourceName + 'List', JSON.stringify(this.modelList));
                    break;
                }
            }

            // respond 200 OK
            return of(new HttpResponse({status: 200}));
        }
    }

    build(): T {
        return null;
    }

    generateData(): T[] {
        this.modelList = [];

        for (let i = 0; i < 20; i++) {
            this.modelList.push(this.build());
        }

        localStorage.setItem(this.resourceName + 'List', JSON.stringify(this.modelList));
        return this.modelList;
    }

    setMockResult(newModel, strType= 'List'): void {
        localStorage.setItem( this.baseUri.resource || this.baseUri.path + strType, JSON.stringify(newModel) );
    }

    setMockHttpResponse(response, headers): void {
        localStorage.setItem( this.baseUri.resource || this.baseUri.path + 'MockHttpResponse', JSON.stringify(response) );
        localStorage.setItem( this.baseUri.resource || this.baseUri.path + 'MockHttpResponseHeaders', JSON.stringify(headers) );
    }

    protected getPagedData(page: Page, itens: any[]): any[] {
        const pagedItens = [];
        page.totalElements = itens.length;
        page.totalPages = page.totalElements / page.size;
        this.headers['X-Total-Count'] = page.totalElements.toString();

        const start = page.pageNumber * page.size;
        const end = Math.min(start + page.size, page.totalElements);
        for (let i = start; i < end; i++) {
            pagedItens.push( itens[i] );
        }
        localStorage.setItem( this.baseUri.resource || this.baseUri.path + 'MockHttpResponseHeaders', JSON.stringify(this.headers) );
        return pagedItens;
    }

    protected setTotalPage(total) {

    }

    protected paginateDataprovider(newModel: any[]) {
        const params = CoreUtils.parsingParams(this.baseUri.params);
        if (params !== undefined) {
            if (params.pageNumber !== undefined && params.pageSize !== undefined) {
                const page: Page = new Page({pageNumber: params.pageNumber, size: params.pageSize});
                newModel = this.getPagedData(page, newModel);
            }
        }
        return newModel;
    }

    protected getDataProviderList(itensList) {
        let newModel = [];
        const itens = JSON.parse(localStorage.getItem(this.baseUri.resource || this.baseUri.path + 'List'));
        if (itens !== null && Array.isArray(itens)) {
            newModel = itens;
        } else {
            newModel = itens?.length ? itens : itensList;
            localStorage.setItem(this.baseUri.resource || this.baseUri.path + 'List', JSON.stringify(newModel));
        }
        return newModel;
    }

    protected getDataProvider(attributeValue: any, attribute = 'id', dataProviderList) {

        const filteredItens = dataProviderList.filter(item => {
                if ( !item[attribute] ) {
                    console.error('Atributo não encontrato na model: ', attribute, item );
                    return null;
                }
                return item[attribute] === '' + attributeValue;
            });
        return filteredItens;
    }

    protected getDataProviderItem(attributeValue: any, attribute = 'id', dataProviderList) {
        return this.getDataProvider(attributeValue, attribute, dataProviderList)[0];
    }


}
