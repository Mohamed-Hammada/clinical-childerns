import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],
   
 
})
export class CreateUpdateMedicalRecordComponent {
 
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  selectedFruits: string[] = [];
  public filterFruits = (term: string) => {
    // Use 'this.allFruits' here
      // return this.http.get<string[]>('https://jsonplaceholder.typicode.com/todos', { 
    //   params: { term } 
    // });
    // debugger
    return of(this.allFruits);
  }
}
