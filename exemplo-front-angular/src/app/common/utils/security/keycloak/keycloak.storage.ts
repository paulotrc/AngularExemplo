import { NgModule } from '@angular/core';
import { IKeycloak } from './ikeycloak';
import {LocalStorageService} from "ngx-webstorage";

export class KeycloakStorage {
    keycloakInstance: IKeycloak;

    tokenKey = 'token';
    idTokenKey = 'idToken';
    refreshTokenKey = 'refreshToken';

    constructor(kcInstance: IKeycloak,public storage: LocalStorageService) {
        this.keycloakInstance = kcInstance;

    }

    setTokens() {
        // debugger
        localStorage.setItem(this.tokenKey, this.keycloakInstance.token);
        localStorage.setItem(this.idTokenKey, this.keycloakInstance.idToken);
        localStorage.setItem(this.refreshTokenKey, this.keycloakInstance.refreshToken);

        this.storage.store(this.tokenKey, this.keycloakInstance.token);
        this.storage.store(this.idTokenKey, this.keycloakInstance.idToken);
        this.storage.store(this.refreshTokenKey, this.keycloakInstance.refreshToken);

    }

    getTokens() {
        // debugger
        const tokens = {
            token: localStorage.getItem(this.tokenKey),
            idToken: localStorage.getItem(this.idTokenKey),
            refreshToken: localStorage.getItem(this.refreshTokenKey)
        };



        if (tokens.idToken) {
            return tokens;
        }
        return undefined;
    }

    removeTokens() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.idTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}
