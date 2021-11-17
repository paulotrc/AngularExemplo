import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services';
import {map} from 'rxjs/operators';
import {Page} from '../components/pagging/Page';
import {CoreUtils} from '../../../core/utils/CoreUtils';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.info('[JwtInterceptor] Checking and inject token....');
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `bearer ${this.authenticationService.getToken()}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        return next.handle(request).pipe(
            map(resp => {
                if (resp instanceof HttpResponse) {
                    const totalElements = resp.headers.get('X-Total-Count');
                    if (totalElements) {
                        const baseUri = CoreUtils.parsingURI(request.url.replace('NOT_IMPLEMENTED', ''));
                        if (baseUri.params) {
                            const params = CoreUtils.parsingParams(baseUri.params);
                            const page: Page = new Page({});
                            page.size = params.pageSize;
                            page.totalElements = +totalElements;
                            localStorage.setItem('page', JSON.stringify(page));
                        }
                        // return resp.clone({body: [{title: 'Replaced data in interceptor'}]});
                        // return resp;
                    }
                    // return resp;
                }
                return resp;
            })
        );
    }
}
