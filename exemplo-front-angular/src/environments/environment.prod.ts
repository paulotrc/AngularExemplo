export const environment = {
  production: true,
  debugg: false,
  usefakeSSO: false,
  fakeAuthenticate: false,
  useFakeBackend: false,
  apiVersion: 'v1',
  isLoggedPath:  'is-logged',
  autenticationPath: 'authenticate',
  apiUrl: 'http://localhost:8080/exemplo-api/',  

  /** Configurações do SSO */
  keycloakOptions: {
    realm: 'intranet',
    clientId: 'clientId',
    url: "https://login.exemplo.com/auth"
  }

};
