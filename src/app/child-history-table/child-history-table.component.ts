import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-history-table',
  templateUrl: './child-history-table.component.html',
  styleUrls: ['./child-history-table.component.css']
})
export class ChildHistoryTableComponent {
  @Input() medicalRecords!: any[]; // Replace 'any' with your actual data type
  @Input() childRecord: any;
  @Output() selectChild = new EventEmitter<number>();

  viewChildDetails(childId: number) {
    this.selectChild.emit(childId);
  }
}
