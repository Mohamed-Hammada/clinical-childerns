import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrls: ['./secretary-page.component.css']
})
export class SecretaryPageComponent implements OnInit{
  childInfoForm!: FormGroup;
  private baseUrl = environment.apiUrl;
  constructor(private fb: FormBuilder,private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit() {
    this.childInfoForm = this.fb.group({
      name: ['', Validators.required],
      birthday: ['', [Validators.required, this.dateValidator]],
      address: [''],
      telephone: [''] // Example pattern for phone numbers
    });
  }

  dateValidator(control: FormControl): {[s: string]: boolean} {
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
            this.showErrorNotification('Form submission failed');
          }
        );
    }
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
