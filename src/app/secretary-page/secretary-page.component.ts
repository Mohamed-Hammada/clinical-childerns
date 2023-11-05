import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("\\+?\\d*")]] // Example pattern for phone numbers
    });
  }

  onSubmit() {
    if (this.childInfoForm.valid) {
      // Process your form submission here. Example:
      console.log('Form Data: ', this.childInfoForm.value);
      // Later, this will involve sending the data to your backend.
    }
  }

}
