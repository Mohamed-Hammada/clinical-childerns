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
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  // // Symptoms  
  // symptoms: string[] = ['Fever', 'Cough', 'Headache', 'Rash', 'Fatigue', 'Nausea', 'Sore Throat', 'Shortness of Breath', 'Muscle Aches', 'Joint Pain', 'Dizziness', 'Loss of Appetite', 'Abdominal Pain', 'Vomiting', 'Diarrhea', 'Swollen Lymph Nodes', 'Chills', 'Difficulty Swallowing', 'Chest Pain',];
  // // Analysis  
  // analysis: string[] = ['Blood Test', 'MRI', 'X-ray', 'Ultrasound', 'CT Scan', 'Electrocardiogram (ECG or EKG)', 'Biopsy', 'Endoscopy', 'Colonoscopy', 'Lumbar Puncture', 'Allergy Tests', 'Thyroid Function Tests', 'Pulmonary Function Tests', 'Bone Density Test', 'Genetic Testing', 'Urine Test', 'Stool Test',];
  // // X-rays  
  // xrays: string[] = ['Chest X-ray', 'Abdominal X-ray', 'Dental X-ray', 'Bone X-ray', 'Spine X-ray', 'Pelvic X-ray', 'Hand X-ray', 'Foot X-ray', 'Joint X-ray', 'Skull X-ray', 'Sinus X-ray', 'Knee X-ray', 'Shoulder X-ray', 'Wrist X-ray', 'Ankle X-ray',];
  // // Diagnosis  
  // diagnosis: string[] = ['Common Cold', 'Flu', 'Allergies', 'Ear Infection', 'Strep Throat', 'Pneumonia', 'Bronchitis', 'Asthma', 'Diabetes', 'Hypertension', 'Migraine', 'Depression', 'Anxiety', 'Gastroenteritis', 'Arthritis', 'Osteoporosis', 'Cancer', 'Autoimmune Diseases', 'Thyroid Disorders',];
  // // Treatment  
  // treatment: string[] = ['Antibiotics', 'Pain Relievers', 'Rest', 'Physical Therapy', 'Surgery', 'Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Counseling', 'Medication Management', 'Lifestyle Changes', 'Dietary Changes', 'Hydration', 'Braces or Splints', 'Oxygen Therapy', 'Psychological Therapy', 'Alternative Medicine',];

  id: string | null  = null;
  selectedFruits: string[] = [];

  selectedSymptoms: string[] = [];
  selectedAnalysis: string[] = [];
  selectedXrays: string[] = [];
  selectedDiagnosis: string[] = [];
  selectedTreatment: string[] = [];
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
    console.log('Selected Symptoms:', this.selectedSymptoms);
    console.log('Selected Analysis:', this.selectedAnalysis);
    console.log('Selected X-rays:', this.selectedXrays);
    console.log('Selected Diagnosis:', this.selectedDiagnosis);
    console.log('Selected Treatment:', this.selectedTreatment);
    console.log('Notes:', this.notes);

    const obj = {id:this.id, child_id: this.childRecord.id ,
       analysis_names: this.selectedAnalysis , symptoms_names:this.selectedSymptoms,
       xrays_names: this.selectedXrays , diagnosis_names: this.selectedDiagnosis ,
        treatment_names : this.selectedTreatment , note : this.notes }
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
