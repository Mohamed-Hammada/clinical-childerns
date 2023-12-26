import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/DataService';
import { KeycloakService } from 'keycloak-angular';
import { NotificationService } from '../services/notification.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrls: ['./secretary-page.component.css']
})
export class SecretaryPageComponent implements OnInit {
  childInfoForm!: FormGroup;
  private baseUrl = environment.apiUrl;
  constructor(private fb: FormBuilder, public readonly keycloak: KeycloakService, private router: Router, private notificationService: NotificationService, private dataService: DataService, private http: HttpClient) { }

  async ngOnInit() {
    const isLoggedIn = await this.keycloak.isLoggedIn();

    if (!isLoggedIn) {
      this.keycloak.login();
    }
  
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
  
      this.http.post<any>(`${this.baseUrl}/api/child/create-or-update`, this.childInfoForm.value)
        .pipe(
          tap(response => {
            // Handle success
            console.log('Response: ', response); 
            this.router.navigate(['/doctor']);
            this.notificationService.showSuccessNotification('Form submitted successfully'); 
          }),
          catchError( async (error) => {

            const isLoggedIn = await this.keycloak.isLoggedIn();

            if (!isLoggedIn) {
              this.keycloak.login();
            }
            // Handle error
            console.error('Error: ', error);
            this.notificationService.showErrorNotification(error.error?.detail);
            
            // Return error for further handling
            return throwError(error); 
          })  
        )
        .subscribe();
  
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
}
