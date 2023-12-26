export const environment = {
  production: true,
  beUrl: 'http://localhost:8080/clinical-childerns',
  keycloak: {
    url: 'http://localhost:8082', // keycloak
    realm: 'kinder-health-clinic',
    clientId: 'be-kinder-health-clinic',
    redirectUri: 'http://localhost:4200', // fe
    profileUrl: "http://localhost:8082/realms/kinder-health-clinic/account/#/personal-info" // keycloak
  },
};
