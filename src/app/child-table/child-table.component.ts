import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.css']
})
export class ChildTableComponent {
  @Input() childRecords!: any[]; // Replace 'any' with your actual data type
  @Output() selectChild = new EventEmitter<number>();
  constructor(private router: Router) { }
  viewChildDetails(childId: number) {
    this.selectChild.emit(childId);
    this.router.navigate(['/child-history', childId]);
  }

}
