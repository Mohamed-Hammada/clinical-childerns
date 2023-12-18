import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrls: ['./secretary-page.component.css']
})
export class SecretaryPageComponent implements OnInit{
  childInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      // Later, this will involve sending the data to your backend.
    }
  }

}
