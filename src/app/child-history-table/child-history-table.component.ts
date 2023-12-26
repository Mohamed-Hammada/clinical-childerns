import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-child-history-table',
  templateUrl: './child-history-table.component.html',
  styleUrls: ['./child-history-table.component.css']
})
export class ChildHistoryTableComponent implements OnInit{
  @Input() medicalRecords!: any[]; // Replace 'any' with your actual data type
  @Input() childRecord: any;
  @Output() selectChild = new EventEmitter<number>();
constructor( public readonly keycloak: KeycloakService) {}
async ngOnInit(): Promise<void> {
  const isLoggedIn = await this.keycloak.isLoggedIn();

  if (!isLoggedIn) {
    this.keycloak.login();
  }
}
  
viewChildDetails(childId: number) {
    this.selectChild.emit(childId);
    console.log('clicked')
  }
}
