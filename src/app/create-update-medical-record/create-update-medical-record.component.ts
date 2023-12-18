import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable ,  map } from 'rxjs';
import { DataService } from '../services/DataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],


})
export class CreateUpdateMedicalRecordComponent {
  private baseUrl = environment.apiUrl;
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  // Symptoms  
  symptoms: string[] = ['Fever', 'Cough', 'Headache', 'Rash', 'Fatigue', 'Nausea', 'Sore Throat', 'Shortness of Breath', 'Muscle Aches', 'Joint Pain', 'Dizziness', 'Loss of Appetite', 'Abdominal Pain', 'Vomiting', 'Diarrhea', 'Swollen Lymph Nodes', 'Chills', 'Difficulty Swallowing', 'Chest Pain',];
  // Analysis  
  analysis: string[] = ['Blood Test', 'MRI', 'X-ray', 'Ultrasound', 'CT Scan', 'Electrocardiogram (ECG or EKG)', 'Biopsy', 'Endoscopy', 'Colonoscopy', 'Lumbar Puncture', 'Allergy Tests', 'Thyroid Function Tests', 'Pulmonary Function Tests', 'Bone Density Test', 'Genetic Testing', 'Urine Test', 'Stool Test',];
  // X-rays  
  xrays: string[] = ['Chest X-ray', 'Abdominal X-ray', 'Dental X-ray', 'Bone X-ray', 'Spine X-ray', 'Pelvic X-ray', 'Hand X-ray', 'Foot X-ray', 'Joint X-ray', 'Skull X-ray', 'Sinus X-ray', 'Knee X-ray', 'Shoulder X-ray', 'Wrist X-ray', 'Ankle X-ray',];
  // Diagnosis  
  diagnosis: string[] = ['Common Cold', 'Flu', 'Allergies', 'Ear Infection', 'Strep Throat', 'Pneumonia', 'Bronchitis', 'Asthma', 'Diabetes', 'Hypertension', 'Migraine', 'Depression', 'Anxiety', 'Gastroenteritis', 'Arthritis', 'Osteoporosis', 'Cancer', 'Autoimmune Diseases', 'Thyroid Disorders',];
  // Treatment  
  treatment: string[] = ['Antibiotics', 'Pain Relievers', 'Rest', 'Physical Therapy', 'Surgery', 'Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Counseling', 'Medication Management', 'Lifestyle Changes', 'Dietary Changes', 'Hydration', 'Braces or Splints', 'Oxygen Therapy', 'Psychological Therapy', 'Alternative Medicine',];

  selectedFruits: string[] = [];

  selectedSymptoms: string[] = [];
  selectedAnalysis: string[] = [];
  selectedXrays: string[] = [];
  selectedDiagnosis: string[] = [];
  selectedTreatment: string[] = [];
  notes: string = '';

  @Input() medicalRecord: any;
  @Input() childRecord: any;
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private http: HttpClient) { }

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

  submitForm() {
    // Log the selected values for each array
    console.log('Selected Symptoms:', this.selectedSymptoms);
    console.log('Selected Analysis:', this.selectedAnalysis);
    console.log('Selected X-rays:', this.selectedXrays);
    console.log('Selected Diagnosis:', this.selectedDiagnosis);
    console.log('Selected Treatment:', this.selectedTreatment);
    console.log('Notes:', this.notes);

    // Add more logic here if needed, such as sending data to a server or other actions.
  }

  autoGrowTextZone(e: Event) {
    const target = (e as any)?.target as HTMLElement | undefined;
    if (target) {
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }


}
