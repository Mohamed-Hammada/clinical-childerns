// keycloak-init.ts

import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment'; // Adjust the path based on your project structure

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
          checkLoginIframeInterval: 25,
          redirectUri: environment.keycloak.redirectUri,
        },
        loadUserProfileAtStartUp: true
      });
  }
  
