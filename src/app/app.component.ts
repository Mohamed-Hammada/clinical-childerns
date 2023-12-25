import { Component,OnInit } from '@angular/core';
import {SecurityService} from "./services/security-service.service";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'clinical-childern';
  constructor(public readonly keycloak: KeycloakService) { }
  ngOnInit(): void {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.keycloak.login(); 
      }
    });
  }
}
