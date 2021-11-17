import {Api} from '../../interfaces/api';
import {BaseApi} from '../base-api';
import {User} from '../../fake-models/user';
// @ts-ignore
import faker from 'faker/locale/pt_BR';
import {Observable, of, throwError} from 'rxjs';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {UsersMock} from '../../fake-db/mocks/auth/UsersMock';
import {ApiClass} from '../../../../../core/decorators/api-class';

// @ApiClass
export class AuthenticateApi extends BaseApi<User> implements  Api<User> {
    constructor() {
        super();
        this.resourceName =  'user';
    }

    build(): User {
        const mock =             {
            id: faker.random.number({min: 5, max: 100}),
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            userName: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            role: faker.random.arrayElement(['admin', 'guet', 'supervisor', 'manager']),
            status: faker.random.arrayElement(['0', '1']),
        };
        return new User( mock );
    }

    doPost(): Observable<HttpEvent<any>> {
        // let openContrato = this.getDataProviderList(id, SamplesMock.itens());
        console.log(':::::::::::: authenticate:::::::::::::::', this.request);
        if (this.request.url.endsWith('/authenticate') && this.request.method === 'POST') {
            console.log(':::::::::::: authenticate:::::::::::::::');
            const usersList = JSON.parse(localStorage.getItem('usersList') ) || UsersMock.itens();


            const filteredUsers = usersList.filter(user => {
                return user.username === this.request.body.username && user.password === this.request.body.password;
            });

            if (filteredUsers.length) {
                // if login details are valid return 200 OK with user details and fake jwt token
                const user = filteredUsers[0];
                const pBody = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                };
                return of(new HttpResponse({status: 200, body: pBody }));
            } else {
                return throwError('Username or password is incorrect');
            }
        }
    }



    doGet(): Observable<HttpEvent<any>> {
        // let openContrato = this.getDataProviderList(id, SamplesMock.itens());

            const currentUser = JSON.parse(localStorage.getItem('currentUser') );


            /*const filteredUsers = usersList.filter(user => {
                return user.username === this.request.body.username && user.password === this.request.body.password;
            });*/

            if (currentUser?.token) {
                // if login details are valid return 200 OK with user details and fake jwt token
/*                const user = filteredUsers[0];
                const pBody = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                };*/
                return of(new HttpResponse({status: 200, body: currentUser }));
            } else {
                console.info('NOT isLogged:: ', currentUser);
                return of(new HttpResponse({ status: 401, body: { message: 'Unauthorised' } }));
            }
    }

}
