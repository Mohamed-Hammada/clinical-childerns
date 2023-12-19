import { Component,Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/DataService';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css'],
  animations: [
    trigger('hoverAnimation', [
      state(
        'initial',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.05)', // Scale up slightly on hover
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Add box shadow on hover
        })
      ),
      transition('initial => hovered', animate('150ms ease-in')),
      transition('hovered => initial', animate('150ms ease-out')),
    ]),
  ],
})
export class ChildCardComponent {
  @Input() child: any;
  hoverState = 'initial'; // Initial state is not hovered
  
  constructor(private router: Router, private route: ActivatedRoute,private dataService: DataService) { this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation started to:', event.url);
    } else if (event instanceof NavigationEnd) {
      console.log('Navigation ended:', event.url);
    } else if (event instanceof NavigationError) {
      console.log('Navigation error:', event.error);
    }
  });}
  viewChildDetails(childId:number){
    console.log("<<<<<<<<<>>>>>>>>>>>>>>>>")
    // debugger
    this.dataService.setData({childRecord: this.child});
    this.router.navigate(['child-history'])

  }
}
