import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalRecord, MedicalRecordImpl } from '../models/medical-record.model';
import { Location } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {  ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-create-update-medical-record',
  templateUrl: './create-update-medical-record.component.html',
  styleUrls: ['./create-update-medical-record.component.css'],
   
 
})
export class CreateUpdateMedicalRecordComponent implements OnInit {
  createEditForm!: FormGroup;
  medicalRecord: any;
  childRecord: any;
  constructor(private fb: FormBuilder, private location: Location) {
    const data = this.location.getState() as any;
    this.medicalRecord = data['medicalRecord']
    this.childRecord = data['childRecord']
  }

  ngOnInit(): void {
    // Initialize the form for creating a new medical record
    this.createEditForm = this.fb.group({
      date: [null, Validators.required],
      symptoms: this.fb.array([]),
      analysis: this.fb.array([]),
      xRays: this.fb.array([]),
      diagnosis: [null, Validators.required],
      treatment: [null, Validators.required],
      notes: [null],
    });
  }

  // Function to save the new medical record
  saveRecord() {
    if (this.createEditForm.valid) {
      // Assuming you have a service to create a new medical record
      this.createMedicalRecord(this.createEditForm.value);
    }
  }

  // Helper functions for managing the dynamic arrays (symptoms, analysis, xRays)
  get symptomsControls() {
    return (this.createEditForm.get('symptoms') as FormArray).controls;
  }

  addSymptom() {
    (this.createEditForm.get('symptoms') as FormArray).push(this.fb.control(null));
  }

  // Add similar functions for analysis and xRays as needed

  private createMedicalRecord(newRecord: any) {
    // Implement a service method to create a new medical record
    // Example: this.medicalRecordService.createMedicalRecord(newRecord);
  }


}
