import {Injectable, Injector} from '@angular/core';

@Injectable()
export class AppService {
    constructor(private injector: Injector) {}
    initializeApp(): Promise<any> {
        return new Promise(((resolve, reject) => {
            console.info('0.0 - [AppBootstrap] - Checkin if user is Logged...::: ');

            if (localStorage.getItem('currentUser')) {
                /*this.injector.get(AuthenticationService).isLoggedIn()
                    .toPromise()
                    .then(res => {
                        console.log('[AppService] isLoggedIn... ', res);
                        // debugger
                        resolve();
                    }, (reason) => {
                        console.log('ERRO', reason);
                        reject();
                    });*/
            } else {
                resolve();
            }
        }));
    }
}
