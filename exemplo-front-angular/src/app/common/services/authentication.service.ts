import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {CoreUtils} from '../../../core/utils/CoreUtils';
import {LocalStorageService} from 'ngx-webstorage';
import {KeycloakService} from "../utils/security/keycloak/keycloak.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    isLogged: BehaviorSubject<boolean | User>;

    constructor(private http: HttpClient, private router: Router, public storage: LocalStorageService, private keycloakService: KeycloakService) {

        // this.storage.retrieve('useFakeBackend');
        // debugger
        if (environment.usefakeSSO !== false && environment.autenticationPath ) {
            const user = CoreUtils.generateFakeUser({}) as User;
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            let user = new User({});
            if(localStorage.getItem("token") != null ) {
                user.username = this.parseJwt(localStorage.getItem("token")).preferred_username;
                user.firstName = this.parseJwt(localStorage.getItem("token")).given_name;
                user.lastName = '';
                // user.lastName = this.parseJwt(localStorage.getItem("token")).family_name;
                user.chave = this.parseJwt(localStorage.getItem("token")).preferred_username;
                user.id = this.parseJwt(localStorage.getItem("token")).preferred_username;
                user.token = this.parseJwt(localStorage.getItem("token"));
            }
            localStorage.setItem('currentUser', JSON.stringify( ( !environment.usefakeSSO ) ? user : new User({} ) ));
        }

        this.isLogged = new BehaviorSubject<boolean | User>(false);

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public getToken(): any {
        console.log('[AuthenticationService] getToken... ');
        return  ( !environment.usefakeSSO ) ? this.keycloakService.getToken() : 'fake-token';
    }

    /*hasValidAccessToken(): boolean {
        return this.keycloakService.hasValidAccessToken();
    }

    initIntervalUpdateToken() {
        this.keycloakService.initIntervalUpdateToken();
    }*/

  /*  stopIntervalUpdateToken() {
        this.keycloakService.stopIntervalUpdateToken();
    }*/

    /*isTokenRefreshExpired() {
        return this.keycloakService.isTokenRefreshExpired();
    }*/

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string = null, password: string = null) {
        console.log('[AuthenticationService] login 1... ');
        if(!environment.usefakeSSO){
            this.keycloakService.login({}).then( res => {
                console.log('[login] ', res);
                /*this.currentUserSubject.next(user);
                this.isLogged.next(true);*/
            });
        }else {

            this.storage.store('service-name', environment.autenticationPath);
            return this.http.post<any>(`${environment.apiUrl}${environment.apiVersion}/${environment.autenticationPath}`,
                {username, password})
                .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.storage.store('service-name', null);
                        this.currentUserSubject.next(user);
                        this.isLogged.next(true);
                    }

                    return user;
                }));
        }
    }

    logout() {
        console.info('LOGOUT:: ');
        // remove user from local storage to log user out
        localStorage.clear();
        this.storage.store('service-name', environment.autenticationPath );
        this.currentUserSubject.next(null);
        if (!environment.usefakeSSO) {
            this.keycloakService.logout().then(res =>{
                this.router.navigate(['/']);
            });
        }else{
            this.router.navigate(['/']);
        }
    }

    isLoggedIn() {
        console.log('[AuthenticationService] isLoggedIn 1 ...');
        if (!environment.usefakeSSO) {
            console.log('[AuthenticationService] verificando com o hasValidAccessToken 1.2 ...');
            if(this.keycloakService.hasValidAccessToken()) {
                console.log('[AuthenticationService] existe o hasValidAccessToken 1.3 ... ');
                /*const user = new User({});
                user.token = this.getToken();*/

                let user = new User({});
                if(localStorage.getItem("token") != null ) {
                    user.username = this.parseJwt(localStorage.getItem("token")).preferred_username;
                    user.firstName = this.parseJwt(localStorage.getItem("token")).preferred_username;
                    user.lastName = '';
                    user.chave = this.parseJwt(localStorage.getItem("token")).preferred_username;
                    user.id = this.parseJwt(localStorage.getItem("token")).preferred_username;
                    user.token = this.parseJwt(localStorage.getItem("token"));
                }

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //@tODO revisar o localstorage do currentUser
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.isLogged.next(user);
                return Observable.of(user);
            } else{
                console.log('[AuthenticationService] não existe o hasValidAccessToken 1.3 ... ');
                return Observable.of(false);
            }
        } else {
            this.storage.store('service-name', environment.isLoggedPath);
            return this.http.get(`${environment.apiUrl}${environment.apiVersion}/${environment.isLoggedPath}`,
                {withCredentials: true}).pipe(
                map(
                    (user: any) => {
                        if (user && user.token) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            this.currentUserSubject.next(user);
                            this.isLogged.next(user);
                        }
                        return user;
                    }
                ));
        }
    }

    updateToken(minValidity: number = -1) {

    }

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };
}
