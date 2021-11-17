import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleRef, Type} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError, from } from 'rxjs';
import {delay, mergeMap, materialize, dematerialize, map} from 'rxjs/operators';
import {GlobalConstants} from '../constants/global.constants';
import {CoreUtils} from '../../../core/utils/CoreUtils';
import {environment} from '../../../environments/environment';
import {BaseUri} from '../../../core/base-uri';

import { isNumeric } from 'rxjs/util/isNumeric';

import {LocalStorageService} from 'ngx-webstorage';
import {Page} from '../components/pagging/Page';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private response: Observable<HttpEvent<any>> = null;
    private baseUri: BaseUri;
    private request: HttpRequest<any>;

    constructor(public storage: LocalStorageService, private compiler: Compiler, private injector: Injector) {
        console.info('9 - [FakeBackendInterceptor] Intercepting Requisition...');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url, method, headers, body} = request;
        const regex = /\/assets\//gm;
        const strUrlAssets = regex.exec(request.url);

        console.info('9.x - [FakeBackendInterceptor] HttpHandler...', url, strUrlAssets);

        if (environment.usefakeSSO && environment.useFakeBackend === true && strUrlAssets === null && url !== 'g') {

            const baseUri = CoreUtils.parsingURI(url.replace('NOT_IMPLEMENTED', ''));

            // const apiVersion: string = GlobalConstants.API.apiVersion;
            // const apiUrl: string = environment.apiUrl + '/' + environment.apiVersion;
            // const storage = this.storage;

            const handleRoute = (): Observable<HttpEvent<any>> => {
                console.info( '9.1 - [FakeBackendInterceptor] - Resource URI::: ', baseUri );
                console.info( '9.1 - [FakeBackendInterceptor] - Resource URI::: ', baseUri.resource );
                const resourceValue = (baseUri.resourceValue !== undefined ) ? baseUri.resourceValue : '';
                const strToApi = (undefined !== baseUri.resource) ? baseUri.resource : baseUri.path;
                const strApiName = CoreUtils.capitalize(CoreUtils.toCamelCase(strToApi)) + 'Api';
                console.info( '9.1 - [FakeBackendInterceptor] - strApiName::: ', strApiName);

                return  from(this.openDynamic(this.storage, baseUri, request, strApiName))
                    .pipe(mergeMap(response => {

                    if ( undefined !== baseUri.params) {
                        const params = CoreUtils.parsingParams(baseUri.params);
                        const page: Page = new Page({});
                        page.size = params.pageSize;
                        console.info( '9.x - [FakeBackendInterceptor] - Setting PAGE Object::: ', page);
                        if ( localStorage.getItem(baseUri.resource || baseUri.path + 'MockHttpResponseHeaders') ) {
                            page.totalElements = JSON.parse(localStorage.getItem(baseUri.resource || baseUri.path
                                + 'MockHttpResponseHeaders'))['X-Total-Count'];
                            localStorage.setItem('page', JSON.stringify(page));
                        }
                    }

                    return response;
                }));


            };


            if (request.headers.get('Authorization') !== null &&  request.headers.get('Authorization') !== undefined ) {
                    console.info( '9.x - [FakeBackendInterceptor] - Fake Authorization::: ', request.url );
                    return of(null)
                        .pipe(mergeMap(handleRoute))
                        .pipe(materialize())
                        .pipe(delay(500))
                        .pipe(dematerialize());

                } else if (request.url.endsWith('/authenticate') && request.method === 'POST') {
                    console.info( '9.x - [FakeBackendInterceptor] - Authenticate::: ', request.url );
                    return of(null)
                        .pipe(mergeMap(handleRoute))
                        .pipe(materialize())
                        .pipe(delay(500))
                        .pipe(dematerialize());
                }  else if (request.url.endsWith('/isLogged') && request.method === 'GET') {

                        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

                        console.info('9.x - [FakeBackendInterceptor] - Checkin if user is Logged...::: ',
                            currentUser, request.headers.get('Authorization'));

                        return of(null)
                        .pipe(mergeMap(handleRoute))
                        .pipe(materialize())
                        .pipe(delay(500))
                        .pipe(dematerialize());

                        /*if (currentUser && currentUser.token === 'Bearer fake-jwt-token') {
                            return of(new HttpResponse({status: 200, body: currentUser }))
                                .pipe(materialize())
                                .pipe(delay(500))
                                .pipe(dematerialize());

                       } else {
                            return of(new HttpResponse({status: 401, body: { message: 'Unauthorised' } }))
                                .pipe(materialize())
                                .pipe(delay(500))
                                .pipe(dematerialize());
                        }*/



                } else if (request.headers.get('Authorization') === null || request.headers.get('Authorization') === undefined) {
                    console.info( '9.x - [FakeBackendInterceptor] - Unauthorised, redirect...::: ', request.url );
                    return of(new HttpResponse({ status: 401, body: { message: 'Unauthorised' } }));
                }
            } else {
            return next.handle(request);
        }
    }

    async openDynamic(storage, baseUri, request, strApiName): Promise<Observable<HttpResponse<any>>> {

        const resourceValue = (baseUri.resourceValue !== undefined ) ? baseUri.resourceValue.trim() : null;
        const relationValue = (baseUri.relationValue !== undefined ) ? baseUri.relationValue.trim() : null;
        const pathValue = (baseUri.pathValue !== undefined ) ? baseUri.pathValue.trim() : null;

        const id = pathValue || resourceValue || relationValue;


        const pMethod = 'do' + CoreUtils.capitalize(request.method.toLocaleLowerCase());

        console.info( '9.2 - [FakeBackendInterceptor] - Loading FakeAPI::: ', './fake-apis/'
            + storage.retrieve('service-name') + '/'
            + baseUri.resource + '-api');

        // let lazyModuleRef: NgModuleRef<any>;

        const strToApi = (undefined !== baseUri.resource) ? baseUri.resource : baseUri.path;

        const module = await import('./fake-apis/' + storage.retrieve('service-name') + '/'
        + strToApi + '-api');

        const objApi = new module[strApiName]();

        if (!objApi[pMethod]) {
            console.info( '9.3 - [FakeBackendInterceptor] - FakeAPI Method, not implemented:: ' +  pMethod );
        } else {
            console.info( '9.3 - [FakeBackendInterceptor] - Setting FakeAPI properties ( request'
                +  JSON.stringify(request ) + ', baseUri' +  JSON.stringify(baseUri ) + ' )' );
            objApi.request = request;
            objApi.baseUri = baseUri;
            console.info( '9.4 - [FakeBackendInterceptor] - Executing FakeAPI Method::: ' +  pMethod );
        }
        return objApi[pMethod](id);
    }

     ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }

     error(message) {
        return throwError({ error: { message } });
    }

     unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    isLoggedIn() {
        return this.request.headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

     idFromUrl() {
        return this.baseUri.resourceValue;
    }
 }

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
