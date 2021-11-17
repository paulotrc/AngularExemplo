import { Injectable, Optional } from '@angular/core';
import { KeycloakStorage as KeycloakStorage } from './keycloak.storage';
import { IKeycloak } from './ikeycloak';
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "ngx-webstorage";
import {timeout} from "../../../../../core/decorators/timeout,ts";

declare const Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  kcInstance: IKeycloak;
  ckStorage: KeycloakStorage;

  updateTokenInterval: any;

  constructor(public storage: LocalStorageService) {

    const { keycloakOptions } = environment;
    this.kcInstance = Keycloak(keycloakOptions);
    this.ckStorage = new KeycloakStorage(this.kcInstance, storage);

  }

  isLogged(): boolean {
    // debugger
    console.log('[CK] isLogged...');
    console.log(this.kcInstance.token);
    return !!this.kcInstance.token;
  }

  private initLoginApp() {
    console.log('[CK] initLoginApp 1...');
    return new Promise<boolean>((resolve, reject) => {
      console.log('[CK] initLoginApp 1.1 ...');
      if (this.isLogged()) {
        console.log('[CK] initLoginApp 1.2.. isLogged');
        if (this.isTokenExpired()) {
          console.log('[CK] initLoginApp 1.3.. isTokenExpired, executando o login...');
          this.login({}).then(() => resolve());
        } else {
          console.log('[CK] initLoginApp 1.3.. token OK, executando o initIntervalUpdateToken...');
            // this.initIntervalUpdateToken(); // @todo retirado para teste
          resolve();
          // window.location.href = '/';
        }
      }
    });
  }

  init() {
    // debugger
    console.log('[CK] init 1...');
    return new Promise<boolean>((resolve, reject) => {
      this.kcInstance.init(this.ckStorage.getTokens()).success((value: boolean) => {
        console.log('[CK] init 1.1... value: ', value);
        // debugger
        if (value) {
          console.log('[CK] init 1.2... Não tem value');
          this.ckStorage.setTokens();
          this.initLoginApp().then(() => resolve(value));
        } else if (this.isTokenRefreshExpired()) {
          console.log('[CK] init 1.2... Tem Value');
          this.ckStorage.removeTokens();
          resolve(value);
        }
      }).error((error: Error) => {
        console.log('Erro ao iniciar keycloak = ', error);
        reject(error);
      });
    });
  }

  login(options:any = { redirectUri: `${location.origin}/search-clients` }) {
    console.log('[CK] login 1... ', options );
    return new Promise<any>((resolve, reject) => {
      this.kcInstance.login(options).success((value: any) => {
        console.log('[CK] login 1.2... ');
        // this.initIntervalUpdateToken(); // @todo retirado para teste
        resolve(value);
      }).error((error: Error) => {
        console.log('Error login =', error);
        reject(error);
      });
    });
  }

  logout(options?: any) {
    console.log('[CK] updateToken 1... logout: ', options);
    this.ckStorage.removeTokens();
    // this.stopIntervalUpdateToken(); @todo removido para teste e porque estav adando erro.

    return new Promise<any>((resolve, reject) => {
      this.kcInstance.logout({ redirectUri: location.origin }).success((value: boolean) => {
        resolve(value);
      }).error((error: Error) => {
        console.log('logout login =', error);
        reject(error);
      });
    });
  }

  updateToken(minValidity: number = -1) {
    console.log('[CK] updateToken 1... minValidity: ', minValidity);
    return new Promise<any>((resolve, reject) => {
      this.kcInstance.updateToken(minValidity).success((value: boolean) => {
        console.log('[CK] updateToken 1... minValidity: ', minValidity);
        this.ckStorage.setTokens();
        resolve(value);
      }).error((error: Error) => {
        console.log('Error updateToken =', error);
        if (this.isTokenRefreshExpired()) {
          this.logout();
        }
        reject(error);
      });
    });
  }

  getUserData(): {} {
    console.log('[CK] authenticated 1... ', this.kcInstance.tokenParsed);
    if (this.kcInstance.tokenParsed) {
      return this.kcInstance.tokenParsed;
    }
    return null;
  }

  getCpfUser() {
    const userData: any = this.getUserData();
    if (userData) {
      return userData.preferred_username;
    }
    return null;
  }

  authenticated(): boolean {
    console.log('[CK] authenticated 1... ', this.kcInstance.authenticated);
    return this.kcInstance.authenticated;
  }

  getToken(): string {
    console.log('[CK] getToken 1... ', this.kcInstance.token);
    return this.kcInstance.token;
  }

  isTokenExpired(minValidity: number = 3000): boolean {
    return this.kcInstance.isTokenExpired(minValidity);
  }

  isTokenRefreshExpired(): boolean {
    console.log('[CK] isTokenRefreshExpired 1... ', this.kcInstance.refreshTokenParsed);
    if (!this.kcInstance.refreshTokenParsed) { return true; }

    const expired = new Date(this.kcInstance.refreshTokenParsed.exp * 1000);
    const atual = new Date();
    console.log('[CK] isTokenRefreshExpired 1.1... ', atual.getTime() >= expired.getTime());
    return (atual.getTime() >= expired.getTime());
  }

  hasValidAccessToken(): boolean {
    console.log('[CK] hasValidAccessToken 1... ', this.isTokenExpired());
    return !this.isTokenExpired();
  }

  @timeout(10000)
  initIntervalUpdateToken() {
    console.log('[CK] initIntervalUpdateToken 1... ');
    this.updateToken().then(() => {
      console.log('[CK] initIntervalUpdateToken 1.2 ... ');
      this.updateTokenInterval = setInterval(() => this.updateToken(), 120000);
    });
  }

  stopIntervalUpdateToken() {
    console.log('[CK] stopIntervalUpdateToken 1... ', this.stopIntervalUpdateToken());
    clearInterval(this.updateTokenInterval);
  }
}
