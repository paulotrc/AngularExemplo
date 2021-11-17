import {environment} from '../../../environments/environment';


export class GlobalConstants {

    public static readonly dev = {
        debugg: environment.debugg,

    }

    public static readonly API = {

        apiUrl: environment.apiUrl,

        apiVersion: environment.apiVersion,
        APP_MAIN_PRIVATE: '../../app/main/private/',
        APP_MAIN_PUBLIC: '../../app/main/public/',

        ENDPOINTS: {

            USER: {
                BASE_URL: '/user',
                LOGIN: '/session'
            }
        }
    };
}

