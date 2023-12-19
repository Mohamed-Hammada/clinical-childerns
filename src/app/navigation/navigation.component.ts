import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isDarkMode: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit() {
      const storedTheme = sessionStorage.getItem('theme');
      if (storedTheme) {
        this.isDarkMode = storedTheme === 'dark';
      }
      this.loadTheme();
    }

    
    toggleTheme() {
     this.isDarkMode = !this.isDarkMode;
     this.loadTheme();
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
}
