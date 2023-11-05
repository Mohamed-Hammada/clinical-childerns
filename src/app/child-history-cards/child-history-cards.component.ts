import { Component,Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  childRecord: any;
  hoverState = 'initial'; // Initial state is not hovered

  viewChildDetails(id:number){}

  // This method needs the child's ID to fetch or calculate the name
getChildName(childId: number): string | void {
  // Logic to retrieve the child's name using the ID
}

calculateAgeYears(birthdate: Date): number | void{
  // Logic to calculate the age in years based on the birthdate
}

calculateAgeDays(birthdate: Date): number | void{
  // Logic to calculate the age in days based on the birthdate
}

calculateDaysSinceLastVisit(lastVisitDate: Date): number {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastVisitDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert the time difference to days
}

}
