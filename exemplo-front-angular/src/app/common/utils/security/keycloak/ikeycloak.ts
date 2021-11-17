export interface IKeycloak {

    tokenParsed: {};
    authenticated: boolean;
    token: string;
    idToken: string;
    refreshToken: string;
    refreshTokenParsed: {exp: number}

    init(options: any): any;
    updateToken(minValidity: number): any;
    login(options: any): any;
    logout(options: any): any;
    isTokenExpired(minValidity: number): boolean;
}
