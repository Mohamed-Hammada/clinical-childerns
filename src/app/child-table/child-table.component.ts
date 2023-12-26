import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/DataService';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.css']
})
export class ChildTableComponent implements OnInit {
  @Input() childRecords!: any[]; // Replace 'any' with your actual data type
  @Output() selectChild = new EventEmitter<number>();
  displayedColumns: string[] = ['name', 'age', 'lastVisit', 'daysSinceLastVisit', 'telephone', 'address'];

  constructor(private router: Router, public readonly keycloak: KeycloakService,private dataService: DataService) { }
  ngOnInit() {
    this.keycloak.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloak.login();
      }
    });
  }
  
  viewChildDetails(child: any) {
    this.selectChild.emit(child.id);
    // debugger
    this.dataService.setData({  childRecord: child });
    this.router.navigate(['/child-history',child.id]);
  }

}
