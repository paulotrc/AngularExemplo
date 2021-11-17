import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService, AlertService} from '../services';
import { CoreAppInjector } from 'core/CoreAppInjector';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private alertService: AlertService;
    constructor(private authenticationService: AuthenticationService) {
        const injector = CoreAppInjector.getInjector();
        this.alertService = injector.get(AlertService);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // ### this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 412){
                this.alertService.error(err.error);
            }
            else if (err.status === 404) {
                console.log( '404');
            }

            console.info('[HttpInterceptor Error]: ', err );

            //const error = err?.error?.message || err?.statusText || err.error;
            return throwError(err.error);
        }));
    }
}
