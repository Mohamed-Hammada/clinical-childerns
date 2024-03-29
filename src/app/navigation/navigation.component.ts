import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isDarkMode: boolean = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,public readonly keycloak: KeycloakService) { }
  ngOnInit() {
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme) {
      this.isDarkMode = storedTheme === 'dark';
    }
    this.loadTheme();



    this.keycloak.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloak.login();
      }
    });
    if (this.isLoggedIn) {
      this.keycloak.loadUserProfile().then((userProfile) => {
        this.userProfile = userProfile;
      });
    }
  }


  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.loadTheme();
  }
  redirectToHome() {
    this.router.navigate(['/']); // Replace '/' with the actual route for your home page
  }

  loadTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light'); // Fix the typo here
      sessionStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      sessionStorage.setItem('theme', 'light');
    }
  }




  async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    })
  }

  public logout() {
    this.keycloak.logout(window.location.origin);
  }

  public profile() {
    window.location.href = environment.keycloak.profileUrl;
  }
}
