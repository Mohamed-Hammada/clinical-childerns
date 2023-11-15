import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],


})
export class CreateUpdateMedicalRecordComponent {

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


  public filterFruits = (term: string) => {
    // Use 'this.allFruits' here
    // return this.http.get<string[]>('https://jsonplaceholder.typicode.com/todos', { 
    //   params: { term } 
    // });
    // debugger
    return of(this.allFruits);
  }
  public filterSymptoms = (term: string) => { return of(this.symptoms); }
  public filterAnalysis = (term: string) => { return of(this.analysis); }
  public filterXrays = (term: string) => { return of(this.xrays); }
  public filterDiagnosis = (term: string) => { return of(this.diagnosis); }
  public filterTreatment = (term: string) => { return of(this.treatment); }

  submitForm() {
    // Log the selected values for each array
    console.log('Selected Fruits:', this.selectedFruits);
    console.log('Selected Symptoms:', this.selectedSymptoms);
    console.log('Selected Analysis:', this.selectedAnalysis);
    console.log('Selected X-rays:', this.selectedXrays);
    console.log('Selected Diagnosis:', this.selectedDiagnosis);
    console.log('Selected Treatment:', this.selectedTreatment);

    // Add more logic here if needed, such as sending data to a server or other actions.
  }


}
