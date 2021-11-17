import {Api} from '../../interfaces/api';
import {BaseApi} from '../base-api';
import {User} from '../../fake-models/user';
// @ts-ignore
import faker from 'faker/locale/pt_BR';
import {Observable, of, throwError} from 'rxjs';
import {HttpEvent, HttpResponse} from '@angular/common/http';

// @ApiClass
export class IsLoggedApi extends BaseApi<User> implements  Api<User> {
    constructor() {
        super();
        this.resourceName =  'user';
    }

    doGet(): Observable<HttpEvent<any>> {
        // let openContrato = this.getDataProviderList(id, SamplesMock.itens());

            const currentUser = JSON.parse(localStorage.getItem('currentUser') );

            if (currentUser?.token) {
                return of(new HttpResponse({status: 200, body: currentUser }));
            } else {
                console.info('NOT isLogged:: ', currentUser);
                return of(new HttpResponse({ status: 401, body: { message: 'Unauthorised' } }));
            }
    }

}
