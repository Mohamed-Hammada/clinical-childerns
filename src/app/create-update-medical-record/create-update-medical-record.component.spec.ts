import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMedicalRecordComponent } from './create-update-medical-record.component';

describe('CreateUpdateMedicalRecordComponent', () => {
  let component: CreateUpdateMedicalRecordComponent;
  let fixture: ComponentFixture<CreateUpdateMedicalRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateMedicalRecordComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
