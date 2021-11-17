import { KeycloakService } from './keycloak.service';

export function keycloakInitialize(authService: KeycloakService) {
    return (): Promise<any> => {
        return authService.init();
    }
}