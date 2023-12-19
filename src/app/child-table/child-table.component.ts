import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/DataService';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.css']
})
export class ChildTableComponent {
  @Input() childRecords!: any[]; // Replace 'any' with your actual data type
  @Output() selectChild = new EventEmitter<number>();
  displayedColumns: string[] = ['name', 'age', 'lastVisit', 'daysSinceLastVisit', 'telephone', 'address'];

  constructor(private router: Router,private dataService: DataService) { }
  viewChildDetails(child: any) {
    // this.selectChild.emit(childId);
    // debugger
    this.dataService.setData({  childRecord: child });
    this.router.navigate(['/child-history']);
  }

}
