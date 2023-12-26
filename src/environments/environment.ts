export const environment = {
    production: false,
    beUrl: 'http://localhost:8080/clinical-childerns',
    keycloak: {
      url: 'http://localhost:8082',
      realm: 'kinder-health-clinic',
      clientId: 'be-kinder-health-clinic',
      redirectUri: 'http://localhost:4200',
      profileUrl: "http://localhost:8080/realms/kinder-health-clinic/account/#/personal-info"
    }
  };
  