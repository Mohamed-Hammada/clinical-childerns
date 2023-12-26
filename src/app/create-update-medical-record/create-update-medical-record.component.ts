import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable, map, catchError, throwError, tap } from 'rxjs';
import { DataService } from '../services/DataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],


})
export class CreateUpdateMedicalRecordComponent {
  private baseUrl = environment.apiUrl;
  id: string | null = null;


  symptoms_names: string[] = [];
  analysis_names: string[] = [];
  xrays_names: string[] = [];
  diagnosis_names: string[] = [];
  treatment_names: string[] = [];
  notes: string = '';
  @Output() selectChild = new EventEmitter<number>();
  @Input() medicalRecord: any;
  @Input() childRecord: any;
  constructor(private route: ActivatedRoute, public readonly keycloak: KeycloakService, private notificationService: NotificationService, private router: Router, private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.keycloak.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloak.login();
      }
    });

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

  filterSymptoms = (term: string): Observable<string[]> => {
    return this.http.get<any>(`${this.baseUrl}/api/symptoms`, {
      params: { term }
    }).pipe(
      catchError(async (error) => {

        const isLoggedIn = await this.keycloak.isLoggedIn();

        if (!isLoggedIn) {
          this.keycloak.login();
        }
        // Handle error
        console.error('Error: ', error);
        this.notificationService.showErrorNotification(error.error?.detail);

        // Return error for further handling
        return throwError(error);
      }),
      map(response => response.content.map((symptom: { name: string }) => symptom.name))
    );
  }

  filterAnalysis = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/analysis`, { params })
      .pipe(
        catchError(async (error) => {

          const isLoggedIn = await this.keycloak.isLoggedIn();

          if (!isLoggedIn) {
            this.keycloak.login();
          }
          // Handle error
          console.error('Error: ', error);
          this.notificationService.showErrorNotification(error.error?.detail);

          // Return error for further handling
          return throwError(error);
        }),
        map(response => response.content.map((item: { name: string }) => item.name))
      );
  }

  filterXrays = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/xrays`, { params })
      .pipe(
        catchError(async (error) => {

          const isLoggedIn = await this.keycloak.isLoggedIn();

          if (!isLoggedIn) {
            this.keycloak.login();
          }
          // Handle error
          console.error('Error: ', error);
          this.notificationService.showErrorNotification(error.error?.detail);

          // Return error for further handling
          return throwError(error);
        }),
        map(response => response.content.map((item: { name: string }) => item.name))
      );
  }

  filterDiagnosis = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/diagnosis`, { params })
      .pipe(
        catchError(async (error) => {

          const isLoggedIn = await this.keycloak.isLoggedIn();

          if (!isLoggedIn) {
            this.keycloak.login();
          }
          // Handle error
          console.error('Error: ', error);
          this.notificationService.showErrorNotification(error.error?.detail);

          // Return error for further handling
          return throwError(error);
        }),
        map(response => response.content.map((item: { name: string }) => item.name))
      );
  }

  filterTreatment = (term: string): Observable<string[]> => {
    const params = new HttpParams().set('term', term);

    return this.http.get<any>(`${this.baseUrl}/api/treatment`, { params })
      .pipe(
        catchError(async (error) => {

          const isLoggedIn = await this.keycloak.isLoggedIn();

          if (!isLoggedIn) {
            this.keycloak.login();
          }
          // Handle error
          console.error('Error: ', error);
          this.notificationService.showErrorNotification(error.error?.detail);

          // Return error for further handling
          return throwError(error);
        }),
        map(response => response.content.map((item: { name: string }) => item.name))
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

    const obj = {
      id: this.id, child_id: this.childRecord.id,
      analysis_names: this.analysis_names, symptoms_names: this.symptoms_names,
      xrays_names: this.xrays_names, diagnosis_names: this.diagnosis_names,
      treatment_names: this.treatment_names, note: this.notes
    }
    this.http.post<any>(`${this.baseUrl}/api/visit-history/submit-or-update`, obj)
      .pipe(
        tap(response => {
          console.log('Response: ', response);
          this.dataService.setData({ childRecord: this.childRecord });
          this.selectChild.emit(this.childRecord.id);
          this.router.navigate(['/child-history',this.childRecord.id]);
          this.notificationService.showSuccessNotification('Form submitted successfully');
        }),
        catchError(async error => {
          const isLoggedIn = await this.keycloak.isLoggedIn();

          if (!isLoggedIn) {
            this.keycloak.login();
          }
          console.error('Error: ', error);
          this.notificationService.showErrorNotification(error.error?.detail);
          return throwError(error);
        })
      )
      .subscribe();


  }
}
