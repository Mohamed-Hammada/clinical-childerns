import { Component, OnInit } from '@angular/core';
import { SecurityService } from "./services/security-service.service";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Kinder Health Clinic';
  constructor(public readonly keycloak: KeycloakService) { }
  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.keycloak.isLoggedIn();

    if (!isLoggedIn) {
      this.keycloak.login();
    }
  }
}
