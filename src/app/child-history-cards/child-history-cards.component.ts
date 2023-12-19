import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router , NavigationExtras} from '@angular/router';
import { DataService } from '../services/DataService';

@Component({
  selector: 'app-child-history-cards',
  templateUrl: './child-history-cards.component.html',
  styleUrls: ['./child-history-cards.component.css'],
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
export class ChildHistoryCardsComponent {
  @Input() medicalRecord: any;
  @Input() childRecord: any;
  hoverState = 'initial'; // Initial state is not hovered
  constructor(private router: Router,private dataService: DataService) { }

  viewChildDetails(medicalRecordId: number) {
    console.log('Child Medical Record')
    this.dataService.setData({  medicalRecord: this.medicalRecord, childRecord: this.childRecord });
    this.router.navigate(['/medical-edits']);
  }
}
