import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public readonly keycloak: KeycloakService) { }
  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
  
    if (!isLoggedIn) {
      this.keycloak.login();
    }
  }
  
}
