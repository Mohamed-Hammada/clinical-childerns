import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable ,  map } from 'rxjs';
import { DataService } from '../services/DataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],


})
export class CreateUpdateMedicalRecordComponent {
  private baseUrl = environment.apiUrl;
  id: string | null  = null;
 

  symptoms_names: string[] = [];
  analysis_names: string[] = [];
  xrays_names: string[] = [];
  diagnosis_names: string[] = [];
  treatment_names: string[] = [];
  notes: string = '';

  @Input() medicalRecord: any;
  @Input() childRecord: any;
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    // debugger
    console.log(this.dataService.data)

    const data = this.dataService.data;
    this.medicalRecord = data.medicalRecord;
    this.childRecord = data.childRecord;
    // debugger
    if (this.medicalRecord) {
      this.id = this.medicalRecord.id;
      this.symptoms_names = this.medicalRecord.symptoms_names;
      this.analysis_names = this.medicalRecord.analysis_names;
      this.xrays_names = this.medicalRecord.xrays_names;
      this.diagnosis_names = this.medicalRecord.diagnosis_names;
      this.treatment_names = this.medicalRecord.treatment_names;
      this.notes = this.medicalRecord.note;
    }


    console.log('Medical Record:', this.medicalRecord);
    console.log('Child Record:', this.childRecord);
    // debugger

  }

 
  public filterSymptoms = (term: string) => {
    return this.http.get<any>(`${this.baseUrl}/api/symptoms/symptoms`, {
      params: { term }
    }).pipe(
      map(response => response.content.map((symptom: {name: string})  => symptom.name))
    );
  }
  public filterAnalysis = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/analysis/analysis`, {
      params
    }).pipe(
      map(response => response.content.map((item: {name: string}) => item.name))
    );
  }

  public filterXrays = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/xrays/xrays`, {
      params
    }).pipe(
      map(response => response.content.map((item:  {name: string}) => item.name))
    );
  }

  public filterDiagnosis = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/diagnosis/diagnosis`, {
      params
    }).pipe(
      map(response => response.content.map((item:  {name: string}) => item.name))
    );
  }

  public filterTreatment = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/treatment/treatment`, {
      params
    }).pipe(
      map(response => response.content.map((item:  {name: string}) => item.name))
    );
  }



  autoGrowTextZone(e: Event) {
    const target = (e as any)?.target as HTMLElement | undefined;
    if (target) {
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }


  submitForm() {
    // Log the selected values for each array
    console.log('Selected Symptoms:', this.id);
    console.log('Selected Symptoms:', this.symptoms_names);
    console.log('Selected Analysis:', this.analysis_names);
    console.log('Selected X-rays:', this.xrays_names);
    console.log('Selected Diagnosis:', this.diagnosis_names);
    console.log('Selected Treatment:', this.treatment_names);
    console.log('Notes:', this.notes);

    const obj = {id:this.id, child_id: this.childRecord.id ,
       analysis_names: this.analysis_names , symptoms_names:this.symptoms_names,
       xrays_names: this.xrays_names , diagnosis_names: this.diagnosis_names ,
        treatment_names : this.treatment_names , note : this.notes }
       this.http.post<any>(`${this.baseUrl}/api/visit-history/submit-or-update`, obj)
        .subscribe(
          (response) => {
            // Handle success
            console.log('Response: ', response);
            this.dataService.setData({  childRecord: this.childRecord });

            this.router.navigate(['/child-history']); // Navigate to success route
            this.showSuccessNotification('Form submitted successfully');
          },
          (error) => {
            // Handle error
            console.error('Error: ', error);
            this.showErrorNotification(error.error.detail);
          }
        );
     
  }

    
// Helper method to show success notification
private showSuccessNotification(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 5000, // Duration in milliseconds
    horizontalPosition: 'start', // Display the snackbar at the start (left) of the screen
    verticalPosition: 'top', // Display the snackbar at the top of the screen
    panelClass: ['success-snackbar'] // You can define your own CSS class for styling
  });
}

// Helper method to show error notification
private showErrorNotification(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 10000, // Duration in milliseconds
    horizontalPosition: 'start', // Display the snackbar at the start (left) of the screen
    verticalPosition: 'top', // Display the snackbar at the top of the screen
    panelClass: ['error-snackbar'] // You can define your own CSS class for styling
  });
}

}
