import { Component, OnInit } from '@angular/core';
import { SecurityService } from "./services/security-service.service";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { ConsoleToggleService } from './services/console-toggle.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Kinder Health Clinic';
  constructor(public readonly keycloak: KeycloakService,private consoleToggleService: ConsoleToggleService) { }
  ngOnInit(): void {
    this.consoleToggleService.disableConsoleInProduction();

    this.keycloak.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloak.login();
      }
    });
  }
}
