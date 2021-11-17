import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs/Rx";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from '../models';



@Injectable({ providedIn: 'root' })
export class UserService {

    users: any;
    onUsersChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        // Set the defaults
        this.onUsersChanged = new BehaviorSubject({});
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    /**
     * Get All Users
     */
    getUsers(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get(`${environment.apiUrl}/users`)
                .subscribe((response: any) => {
                    this.users = response;
                    this.onUsersChanged.next(this.users);
                    resolve(this.users);
                }, reject);
        });
    }



    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    save(user: User) {
        if(user.id === null){
            return this.register(user);
        }else{
            return this.update(user);
        }

    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users`, user);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAll()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
}
