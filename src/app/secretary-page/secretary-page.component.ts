import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/DataService';

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrls: ['./secretary-page.component.css']
})
export class SecretaryPageComponent implements OnInit {
  childInfoForm!: FormGroup;
  private baseUrl = environment.apiUrl;
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {

    const childRecord = this.dataService.data.childRecord;
    if (childRecord) {
      this.childInfoForm = this.fb.group({
        id:[childRecord.id,Validators.required],
        name: [childRecord.name, Validators.required],
        birthday: [childRecord.birthday, [Validators.required, this.dateValidator]],
        address: [childRecord.address],
        telephone: [childRecord.telephone] // Example pattern for phone numbers
      });
    }else{
      this.childInfoForm = this.fb.group({
        id:[null],
        name: ['', Validators.required],
        birthday: ['', [Validators.required, this.dateValidator]],
        address: [''],
        telephone: [''] // Example pattern for phone numbers
      });
    }
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (isNaN(Date.parse(control.value))) {
      return { 'invalidDate': true };
    } else {
      return {};
    }
  }



  onSubmit() {
    if (this.childInfoForm.valid) {
      // Process your form submission here. Example:
      console.log('Form Data: ', this.childInfoForm.value);

      this.http.post<any>(`${this.baseUrl}/api/child/create-or-update`, this.childInfoForm.value)
        .subscribe(
          (response) => {
            // Handle success
            console.log('Response: ', response);
            this.router.navigate(['/doctor']); // Navigate to success route
            this.showSuccessNotification('Form submitted successfully');
          },
          (error) => {
            // Handle error
            console.error('Error: ', error);
            this.showErrorNotification(error.error.detail);
          }
        );
    }
  }

  checkFormValidityTest() {
    // debugger
    Object.keys(this.childInfoForm.controls).forEach(controlName => {
      const control = this.childInfoForm.get(controlName);

      // Clear existing error messages
      control?.setErrors(null);

      // Check for validity and display error message
      if (control && control.invalid) {
        const messages: string[] = [];

        if (control.errors) {
          for (const key in control.errors) {
            switch (key) {
              case 'required':
                messages.push(`${controlName} is required`);
                break;
              case 'invalidDate':
                messages.push(`${controlName} has an invalid date`);
                break;
              // Add additional cases for other validation rules if needed
            }
          }
        }

        // Set the error messages for the control
        control.setErrors({ 'validationErrors': messages });
        console.log('Error messages: ', messages);
      }
    });
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
